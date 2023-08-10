function makeRequest(location){
    return new Promise((resolve, reject) => {
        if(location == 'Google'){
            resolve('Google Says Hi')
        }else{
            reject('We can only talk to Google')
        }
    })
} 

function processRequest(response){
    return new Promise((resolve, reject) => {
        console.log('Processing response')
        resolve(`Extra information: ${response}`)
    })
}

async function doWork(){
    try{
        const response = await makeRequest('Facebook') 
        console.log('Response Received.')
        const processedResponse = await processRequest(response)
        console.log(processedResponse)
        
    }
    catch (e) {
        console.error(e)
    }
}
doWork()