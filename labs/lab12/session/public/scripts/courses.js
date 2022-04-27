// alert("courses loaded");

document.addEventListener("DOMContentLoaded", () => {
  // alert("DOM loaded");

  const programsHTMLElement = document.querySelector("#programs");
  // if (programsHTMLElement) {
  programsHTMLElement.addEventListener("change", updatePrograms);
  // }
});

async function updatePrograms() {
  // alert("program updated");

  const programsHTMLElement = document.querySelector("#programs");

  // client-side rendering using JSON + client-side string templates
  const response = await fetch(`/api/courses/${programsHTMLElement.value}`);
  const data = await response.json();

  // using client-side string templates
  /*
  courses.innerHTML = "<thead><tr><th>Code</th><th>Name</th></tr></thead>";
  courses.innerHTML += "<tbody>";

  data.forEach(course => {
    courses.innerHTML += `<tr><td>${course.code}</td><td>${course.name}</td></tr>`;
  });
  courses.innerHTML += "</tbody>";
  */

  // using DOM elements
  /*
  document.createElement("thead");
  ...
  */

  // client-side rendering using JSON + client-side handlebars
  // template can also be fetched from the server
  const template = `
    <thead>
      <tr>
        <th>Code</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {{#each courses}}
      <tr>
        <td>{{this.code}}</td>
        <td>{{this.name}}</td>
      </tr>
      {{/each}}
    </tbody>`;

  const compiledTemplate = Handlebars.compile(template);
  courses.innerHTML = compiledTemplate({ courses: data });

  // server-side rendering using handlebars
  /*
  const response = await fetch(`/api/courses/${programsHTMLElement.value}/html`);
  const data = await response.text();

  const coursesHTMLElement = document.querySelector("#courses");
  courses.innerHTML = data;
  */
}
