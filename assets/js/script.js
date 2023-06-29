const apiUrl =
  "https://api.battlemetrics.com/servers?filter[game]=rust&filter[status]=online&page[size]=100&filter[countries][]=TR";
var list = document.getElementById("list");

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => {
    data.data.sort((b, a) => {
      //chatgpt verdi sor bunu
      return a.attributes.players - b.attributes.players;
    });

    data.data.forEach((server) => {
      const name = server.attributes.name;
      const mod = server.attributes.details.rust_type;
      const map = server.attributes.details.map;
      const players = server.attributes.players;
      const ip = server.attributes.ip;
      const port = server.attributes.port;
      const status = server.attributes.status;

      if (status == "online") {
        list.innerHTML += `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${name}
                <span class="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Online</span>
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
      } else {
        list.innerHTML += `
        <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td class="w-4 p-4">
            </td>
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${name}
                <span class="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Offline</span>
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
      }
    });
  })
  .catch((error) => {
    console.log("Error:", error);
  });
