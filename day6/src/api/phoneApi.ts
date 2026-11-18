import { COLOR_ORDER, PHONES } from '../data/phones';
import type { ColorKey, Phone } from '../types';

export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? '').trim().replace(/\/+$/, '');
export const USING_API = API_URL !== '';

function abortedError() {
  const error = new Error('Yêu cầu đã bị hủy.');
  error.name = 'AbortError';
  return error;
}

function wait(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { reject(abortedError()); return; }
    const abort = () => { clearTimeout(timer); reject(abortedError()); };
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', abort);
      resolve();
    }, ms);
    signal?.addEventListener('abort', abort, { once: true });
  });
}

function isColor(value: unknown): value is ColorKey {
  return typeof value === 'string' && COLOR_ORDER.includes(value as ColorKey);
}

// Kiem tra JSON truoc khi dung du lieu API trong giao dien.
export function parsePhone(value: unknown): Phone {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Dữ liệu sản phẩm từ API không hợp lệ.');
  }
  const record = value as Record<string, unknown>;
  const text = (key: string) => {
    if (typeof record[key] !== 'string' || !record[key].trim()) {
      throw new Error(`API thiếu trường văn bản “${key}”.`);
    }
    return record[key] as string;
  };
  const number = (key: string) => {
    const raw = record[key];
    if ((typeof raw !== 'number' && typeof raw !== 'string') || String(raw).trim() === '' || !Number.isFinite(Number(raw)) || Number(raw) < 0) {
      throw new Error(`Trường “${key}” của API phải là số không âm.`);
    }
    return Number(raw);
  };
  if ((typeof record.id !== 'string' && typeof record.id !== 'number') || !String(record.id).trim()) {
    throw new Error('API thiếu mã sản phẩm.');
  }
  if (!Array.isArray(record.colors) || record.colors.length === 0 || !record.colors.every(isColor)) {
    throw new Error('Trường “colors” phải là mảng các màu silver, red, black, blue.');
  }
  if (!isColor(record.defaultColor) || !record.colors.includes(record.defaultColor)) {
    throw new Error('Màu mặc định của API không nằm trong danh sách màu.');
  }
  const rating = number('rating');
  if (rating > 5) throw new Error('Điểm đánh giá phải nằm trong khoảng 0 đến 5.');
  return {
    id: String(record.id), name: text('name'), price: number('price'), oldPrice: number('oldPrice'),
    rating, reviewCount: number('reviewCount'), supplier: text('supplier'), badge: text('badge'),
    colors: [...new Set(record.colors as ColorKey[])], defaultColor: record.defaultColor,
  };
}

export async function fetchPhone(id: string, options: { signal?: AbortSignal } = {}): Promise<Phone> {
  if (!USING_API) {
    await wait(600, options.signal);
    const phone = PHONES.find((item) => item.id === id);
    if (!phone) throw new Error('Không tìm thấy sản phẩm.');
    return phone;
  }

  const controller = new AbortController();
  const abort = () => controller.abort();
  if (options.signal?.aborted) throw abortedError();
  options.signal?.addEventListener('abort', abort, { once: true });
  let timedOut = false;
  const timeout = setTimeout(() => { timedOut = true; controller.abort(); }, 10000);
  try {
    const response = await fetch(`${API_URL}/phones/${encodeURIComponent(id)}`, {
      signal: controller.signal,
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`Máy chủ trả về lỗi ${response.status}.`);
    let payload: unknown;
    try { payload = await response.json(); }
    catch { throw new Error('API không trả về JSON hợp lệ.'); }
    return parsePhone(payload);
  } catch (error) {
    if (options.signal?.aborted) throw abortedError();
    if (timedOut) throw new Error('Máy chủ phản hồi quá lâu. Vui lòng thử lại.');
    if (error instanceof TypeError) throw new Error('Không kết nối được API. Kiểm tra địa chỉ API và kết nối mạng.');
    throw error;
  } finally {
    clearTimeout(timeout);
    options.signal?.removeEventListener('abort', abort);
  }
}
