const apiUrl =
  "https://api.battlemetrics.com/servers?filter[game]=rust&filter[status]=online&page[size]=100&filter[countries][]=TR";

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.data.sort((b, a) => {
      //chatgpt verdi sor bunu
      return a.attributes.players - b.attributes.players;
    });

    var totalPlayer = 0;
    var totalServer = 0;
    const serverListCount = [];
    let listHtml = ``;
    var counter = parseInt(localStorage.getItem("counter")) || 300; //localstorage


    data.data.forEach((server) => {
      const name = server.attributes.name;
      const mod = server.attributes.details.rust_type;
      const map = server.attributes.details.map;
      const players = server.attributes.players;
      const ip = server.attributes.ip;
      const port = server.attributes.port;
      const status = server.attributes.status;
      const serverCount = server.type;

      totalPlayer += players;


      if (serverListCount[serverCount]) {
        serverListCount[serverCount]++;
      } else {
        serverListCount[serverCount] = 1;
      }

      listHtml += `
      <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
          <td class="w-4 p-4">
          </td>
          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${name}
            ${
              status == "online"
                ? '<span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Online</span>'
                : '<span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Offline</span>'
            }
          </th>
          <td class="px-6 py-4">
              ${mod}
          </td>
          <td class="px-6 py-4">
              ${map}
          </td>
          <td class="px-6 py-4">
              ${players}
          </td>
          <td class="px-6 py-4">
              <a href="steam://connect/${ip}:${port}" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" target="_blank">Connect</a>
          </td>
      </tr>
    `;
    });

    for (const key in serverListCount) {
      serverListCount[key] = parseInt(serverListCount[key]);
    }

    setInterval( function(){
        counter--;

      if( counter >= 0 ){
        countDown = document.getElementById("count");
        countDown.innerHTML = `List Tracking: ${counter}`;
        localStorage.setItem("counter", counter);
      }

      if( counter === 0 ){
        countDown.innerHTML = "REST";
        localStorage.removeItem("counter");
        location.reload();
      }
    }, 1000);

    totalServer = serverListCount.server;
    setList(listHtml);
    setTotals(totalPlayer, totalServer);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

const setTotals = (totalPlayer, totalServer) => {
  try {

    const totalPlayersDOM = document.getElementById("totalPlayersDOM");
    const totalServersDOM = document.getElementById("totalServersDOM");
    if (totalPlayersDOM) totalPlayersDOM.innerHTML = `Total Players: ${totalPlayer}`;
    if (totalServersDOM) totalServersDOM.innerHTML = `Total Servers: ${totalServer}`;
  } 
  catch (err) {
    console.log(err);
  }
};

const setList = (listHtml) => {
  try {
    var list = document.getElementById("list");

    if (list) list.innerHTML = listHtml;
  } catch (err) {
    console.log(err);
  }
};
