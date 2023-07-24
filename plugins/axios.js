
export default function ({ $axios, redirect, $toast }) {

    $axios.setBaseURL(process.env.API_KEY)
   
    $axios.onRequest(config => {
      console.log('Making request to ' + config.url)
    })
  
    $axios.onError(error => {
      const code = parseInt(error.response && error.response.status)
      if (code === 400) {
        $toast.error("Ocorreu um erro")
      }
    })
  }