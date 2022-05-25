
let data = [
    { name: 'Mitarbeiter die Disposition (m/w/d)', category: 'Disposition', company: 'Muster Elektrotechnik GmbH' },
    { name: 'Projektleiter Elektrotechnik (m/w/d)', category: 'Elektrotechnik', company: 'Muster Steuerungstechnik GmbH' },
    { name: 'Mechatroniker (m/w/d)', category: 'Elektrotechnik', company: 'Muster Robotics GmbH' },
    { name: 'Service- und Kundendiensttechniker (m/w/d)', category: 'Auyendienst', company: 'Muster Elektrotechnik GmbH' },
    { name: 'SystemintegratorGebäudeautomation(m/w/d)', category: 'Elektrotechnik', company: 'Muster GmbH' },
    { name: 'IT-SystemadministratorSecond-Level-Support(m/w/d)', category: 'Verwaltung', company: 'Muster Elektrotechnik GmbH' },
    { name: 'Elektroniker für Automatisierungstechnik (m/w/d)', category: 'Elektrotechnik', company: 'Muster Elektrotechnik GmbH' },
    { name: 'Projektleiter Energietechnik (m/w/d)', category: 'Verwaltung', company: 'Muster Steuerungstechnik GmbH' },
    { name: 'Monteur Energietechnik (m/w/d)', category: 'Außendienst', company: 'Muster Elektrotechnik GmbH' },
    { name: 'Konstrukteur Energietechnik (m/w/d)', category: 'Verwaltung', company: 'Muster Energietechnik GmbH' },
    { name: 'Programmierer SPS/Visu (m/w/d)', category: 'Entwicklung', company: 'Muster Elektrotechnik GmbH' },
    { name: 'Projektleitung für Maschinensteuerungen (m/w/d)', category: 'Entwicklung', company: 'Muster Elektrotechnik GmbH' },
    { name: 'Meister/Obermonteur Elektrotechnik (m/w/d)', category: 'Außendienst', company: 'Muster Steuerungstechnik GmbH' },
    { name: 'Elektroniker für Energie- und Gebäudetechnik (m/w/d)', category: 'Elektrotechnik', company: 'Muster Energietechnik GmbH' },
    { name: 'Elektrotechniker/-meister Konstruktion für Maschinen- un Anlagensteuerungen(m/w/d)', category: 'test', company: 'Muster Elektrotechnik GmbH' },
];

let sortProps = {
    name: true,
    category: true,
    company: true
};

function buildTable() {
    var tableBody = document.getElementById("joTable").tBodies.item(0)
    tableBody.innerHTML = "";
    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
                        <td data-label="Stellenbezeichnung" class="job-name"><span>${data[i].name}</span></td>
                        <td data-label="Tätigkeitsbereich">${data[i].category}</td>
                        <td data-label="Firma">${data[i].company}</td>
                   </tr>`
        tableBody.innerHTML += row
    }
}

function sortByType(e, type) {
    switch (type) {
        case 'name':
            sortData(e, type, 'name');
            break;
        case 'category':
            sortData(e, type, 'category');
            break;
        case 'company':
            sortData(e, type, 'company');
            break;
    }
    filter();
}

function sortData(e, type, prop) {
    if (sortProps[type]) {
        e.target.classList.add('order-asc');
        e.target.classList.remove('order-desc');
        data = data.sort((a, b) => (a[prop] > b[prop]) ? 1 : ((b[prop] > a[prop]) ? -1 : 0));
    } else {
        e.target.classList.add('order-desc');
        e.target.classList.remove('order-asc');
        data = data.sort((a, b) => (b[prop] > a[prop]) ? 1 : ((a[prop] > b[prop]) ? -1 : 0));
    }
    sortProps[type] = !sortProps[type];
}

function buildList(listName, prop) {
    var list = document.getElementById(listName)
    uniqueKeyList = [...new Set(data.map(obj => obj[prop]))];
    for (var i = 0; i < uniqueKeyList.length; i++) {
        var row = `<option>${uniqueKeyList[i]}</option>`
        list.innerHTML += row
    }
}

function filter() {
    var input, tableBody, tr, td, i;
    input = document.getElementById('jobOfferInput');
    categorylist = document.getElementById('categoryList');
    companyList = document.getElementById('companyList');

    filterInput = input.value.toUpperCase();
    filterCategorylist = categorylist.value.toUpperCase();
    filterCompanyList = companyList.value.toUpperCase();
    let filteredData = data.filter(val => val.name.toUpperCase().indexOf(filterInput) > -1);
    if (filterCategorylist != "Tätigkeitsbereich".toUpperCase()) {
        filteredData = filteredData.filter(val => val.category.toUpperCase().indexOf(filterCategorylist) > -1);
    }
    if (filterCompanyList != "Firma".toUpperCase()) {
        filteredData = filteredData.filter(val => val.company.toUpperCase().indexOf(filterCompanyList) > -1);
    }
    tableBody = document.getElementById("joTable").tBodies.item(0);
    tr = tableBody.getElementsByTagName("tr");

    if (!filteredData.length) {
        tableBody.innerHTML = `<tr>
                               <td colspan="3" class="text-center fw-700">Ihre Suchparameter liefern leider keine passenden Ergebnisse.</td>
                               </tr>`;
        return;
    } else {
        buildTable();
    }

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (filteredData.some(e => e.name.toUpperCase() == txtValue.toUpperCase())) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

window.onload = () => {
    buildTable();
    buildList('categoryList', 'category');
    buildList('companyList', 'company');
};
