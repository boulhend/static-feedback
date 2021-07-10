const title="Fast Feedback - the easiest way to add custom feedback"
const description="Fast feddback is awesome"

const SEO={
    title,
    description,
    canonical:"https://www.fastfeedback.com/",
    openGraph:{
        type:'website',
        locale:'en_IE',
        url: 'https://www.fastfeedback.com/',
        title,
        description,
        images: [
          {
            url: 'https://www.fastfeedback.com/og.jpg',
            width: 512,
            height: 512,
            alt: 'Og Image Alt',
          }
        ],
        site_name: 'SiteName',
      }
      
}
export default SEO 