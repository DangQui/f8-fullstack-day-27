const bodyTable = document.querySelector("#table tbody");
console.log(bodyTable);

const { href, protocol, hostname, port, pathname, search, hash, origin } =
  window.location;

const propertiesArr = [
  {
    name: "href",
    value: href,
    description: "URL đầy đủ hiện tại",
  },
  {
    name: "protocol",
    value: protocol,
    description: "Giao thức hiện tại (http & https)",
  },
  {
    name: "hostname",
    value: hostname,
    description: "Tên miền (ví dụ: google.com)",
  },
  {
    name: "port",
    value: port,
    description:
      "Số cổng (ví dụ: 3000, 8000 hoặc không hiển thị nếu là cổng mặc định)",
  },
  {
    name: "pathname",
    value: pathname,
    description: "Đường dẫn sau tên miền (ví dụ: /category/product)",
  },
  {
    name: "search",
    value: search,
    description: "Phần query bao gồm dấu '?' (ví dụ: ?id=123&name=abc)",
  },
  {
    name: "hash",
    value: hash,
    description: "Phần Fragment Identifier bao gôm dấu '#' (ví dụ: #section1)",
  },
  {
    name: "origin",
    value: origin,
    description: "Origin của URL (protocol + hostname + port)",
  },
];

const html = propertiesArr
  .map((property) => {
    console.log(property);
    return `<tr>
             <td class="bold">location.${property.name}</td>
             <td>${property.value}</td>
             <td><span>${property.name}</span> - ${property.description}</td>
            </tr>`;
  })
  .join("");

bodyTable.innerHTML = html;
