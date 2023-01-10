self.addEventListener("push", e => {
    const data = e.data.json();
    console.log("Push Recieved...");
    self.registration.showNotification(data.title, {
      body: data.content,
      icon: "http://image.ibb.co/frYOFd/tmlogo.png"
    });
  });



  //client.js
  const publicVapidKey =
  "BHcTbJJRX6SmGSuw6-s1s4RQTSm6jSyCOA8VTUeVVPWnfEC-roH00cM6HlhdVl8cV2rWucqyq5GrmR5WelWg5U0";

// Check for service worker
if ("serviceWorker" in navigator) {
  // send().catch(err => console.error(err));
}


