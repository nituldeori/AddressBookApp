let contactList ;
window.addEventListener('DOMContentLoaded',(event)=>{
   contactList = getAddressDataFromStorages();
   document.querySelector('.emp-count').textContent = contactList.length;
    createInnerHtml();
    localStorage.removeItem('editEmp')
  
});

const getAddressDataFromStorages = () =>{
  return localStorage.getItem('ContactList')? JSON.parse(localStorage.getItem("ContactList")) : [];
  }

const createInnerHtml= () => {
    
    const headerHtml = "<th>Full Name </th> <th>Address</th> <th>City</th> <th>State</th>"+
                            "<th>Zip</th> <th>Phone Number</th> <th>Actions</th>";
    if (contactList.length == 0) return;
    let innerHtml = `${headerHtml}`;

    for(const contact of contactList){
        innerHtml = `${innerHtml}
        <tr>
            <td>${contact._name}</td>
            <td>${contact._address}</td>
            <td>${contact._city}</div>
            <td>${contact._state}</td>
            <td>${contact._zip}</td>
            <td>${contact._phone}</td>
            <td>
            <img id="${contact.id}" onclick="remove(this)" alt="delete" src="../assets/icons/delete-black-18dp.svg">
            <img id="${contact.id}"  onclick="update(this)" alt="edit" src="../assets/icons/create-black-18dp.svg">
            </td>
        </tr>
        `;
    }
    document.querySelector('#table-display').innerHTML = innerHtml;

}

const remove=(node) =>{
    let contactData = contactList.find(contact=>contact.id==node.id);
    if (!contactData) return;
    const index = contactList.indexOf(contactData);
    contactList.splice(index,1);
    localStorage.setItem("ContactList",JSON.stringify(contactList));
    createInnerHtml();
}

const update = (node) => {
    let contactData = contactList.find(contact => contact.id==node.id);
    if(!contactData) return;
    localStorage.setItem('editEmp',JSON.stringify(contactData));
    const index = contactList.indexOf(contactData);
    contactList.splice(index,1);
    localStorage.setItem("ContactList",JSON.stringify(contactList));
    window.location.replace("../pages/addressBookForm.html");
}