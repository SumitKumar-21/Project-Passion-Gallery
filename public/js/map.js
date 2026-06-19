
    const map = new mapboxgl.Map({
        accessToken:mapToken,
        container: 'map',
        style: 'mapbox://styles/mapbox/standard', // Use the standard style for the map
        projection: 'globe', // display the map as a globe
        zoom: 9, 
        center: data.geometry.coordinates 
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
        map.setFog({}); 
    });


  const marker = new mapboxgl.Marker()
  .setLngLat(data.geometry.coordinates)
  .setPopup(
    new mapboxgl.Popup({ offset:35,closeButton:false ,altitude:10,closeOnMove:true, className:'popup' }) // optional offset
      .setHTML(`<h3>${data.title}</h3><p>The most populous resort in ${data.country}</p>`)
      .setMaxWidth("300px")
  )
  .addTo(map);




  
