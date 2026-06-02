async function test() {
  try {
    console.log("Fetching eng...");
    const engRes = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/eng-bukhari.json`);
    console.log("Eng status:", engRes.status);
    
    console.log("Fetching ara...");
    const araRes = await fetch(`https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/ara-bukhari.json`);
    console.log("Ara status:", araRes.status);
    
    const engData = await engRes.json();
    console.log("Eng data parsed.");
    const araData = await araRes.json();
    console.log("Ara data parsed.");
    console.log("Success");
  } catch (err) {
    console.error("Failed:", err);
  }
}

test();
