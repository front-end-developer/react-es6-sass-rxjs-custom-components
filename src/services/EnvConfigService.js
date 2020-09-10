/**
 * Created by Mark Webley on 09/09/2020.
 */
const envConfigService = async () => {

    // simulate a backend config service
    const envResp = await new Promise(resolve => {
        setTimeout(() => {
            resolve({environment: 'Dev'});
        }, 1000);
    })
    return envResp;
};



export { envConfigService };
