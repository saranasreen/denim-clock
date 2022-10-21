async function getWeaves(url) {
    // Default options are marked with *
    const response = await fetch(url);
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
async function getCityData(url) {
  // Default options are marked with *
  const response = await fetch(url);
  return response.json(); // parses JSON response into native JavaScript objects
}

function getDensity(speed) {
  // speed limit on bridge is 40
  var density = 1 - speed / 40;
  return density;

}