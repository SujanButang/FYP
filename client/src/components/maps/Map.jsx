import React from "react";

const Map = ({ locationName }) => {
  const [mapUrl, setMapUrl] = React.useState(null);

  React.useEffect(() => {
    // Use the Google Maps Embed API to generate the map URL
    const apiKey = "AIzaSyC1SXy0Lb0LnpWqIurB18pXos6AuwAyTeQ";
    const encodedLocation = encodeURIComponent(locationName);
    const url = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedLocation}`;
    setMapUrl(url);
  }, [locationName]);

  return (
    <div>
      {mapUrl && (
        <iframe
          width="600"
          height="450"
          frameborder="0"
          style={{ border: 0 }}
          src={mapUrl}
          allowfullscreen
        ></iframe>
      )}
    </div>
  );
};

export default Map;
