//Method fetch FishEyeDataExport
// Replace js with your JSON feed

const getMedias = async () => {
    let media;
  
    const res = await fetch("dataJson/FishEyeData.json", { mode: "no-cors" });
    if (!res.ok) {
      throw "Invalid Error : Fetch Invalid";
    }
    const data = await res.json();
  
    media = data.media;
  
    console.log(media);
  
    return { media };
  };
  
  export { getMedias };