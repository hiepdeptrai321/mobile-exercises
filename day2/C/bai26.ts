async function waitFiveSeconds(): Promise<void> {
    await new Promise<void>((resolve) => {
        setTimeout(() => {
            resolve();
        }, 5000);
    });

    console.log("Finished waiting 5 seconds");
}

waitFiveSeconds();
