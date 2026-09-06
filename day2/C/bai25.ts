async function downloadFile(fileName: string): Promise<void> {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 3000);
    });

    console.log("Download complete: " + fileName);
}

downloadFile("example.pdf");
