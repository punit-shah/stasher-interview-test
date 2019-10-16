const API_KEY = process.env.GOOGLE_API_KEY
const getGoogleUrl = (location) => `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${API_KEY}`


export const getCoordsFromLocation = async (location) => {
  const res = await fetch(getGoogleUrl(location))

  return res.json()
}
