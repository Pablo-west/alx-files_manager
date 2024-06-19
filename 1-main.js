import dbClient from './utils/db';

const waitConnection = () => {
    return new Promise((resolve, reject) => {
        let indexCount = 0;
        const repeatFct = async () => {
            await setTimeout(() => {
                indexCount += 1;
                if (indexCount >= 10) {
                    reject()
                }
                else if(!dbClient.izLive()) {
                    repeatFct()
                }
                else {
                    resolve()
                }
            }, 1000);
        };
        repeatFct();
    })
};

(async () => {
    console.log(dbClient.izLive());
    await waitConnection();
    console.log(dbClient.izLive());
    console.log(await dbClient.bbUsers());
    console.log(await dbClient.bbFiles());
})();
