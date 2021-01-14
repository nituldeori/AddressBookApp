class Contact {

    id;

    get name() {
        return this._name;
    }
    set name(name) {
        let nameRegex = RegExp('^[A-Z]{1}[a-zA-Z ]{2,}$');
        if (nameRegex.test(name))
            this._name = name;
        else throw "Name is incorrect!";
    }

    get address(){
        return this._address;
    }
    set address(address){
        this._address = address;   
    }

    get zip(){
        return this._zip;
    }
    set zip(zip){
        this._zip = zip;   
    }

    get phone(){
        return this._phone;
    }
    set phone(phone){
        let nameRegex = RegExp('^[0-9]{10,13}$');
        if (nameRegex.test(phone)) this._phone = phone;
        else throw "Phone  is Invalid"    
    }

    get city(){
        return this._city;
    }
    set city(city){
        this._city=city;
    }

    get state(){
        return this._state;
    }
    set state(state){
        this._state=state;
    }

    toString(){
        return "Name: "+this._name + " Address: "+this._address +" City: "+this._city+" State: "+this._state+
        " ZIP: "+this._zip+" Phone: "+this._phone;
    }

}

let isUpdate = false;
let contactObj = {};

window.addEventListener('DOMContentLoaded', (event) => {
const names = document.querySelector('#name');
names.addEventListener('input', function () {
    if (names.value.length == 0) {
    document.querySelector('.text-error').textContent="";
    return;
    }
    try {
    (new Contact()).name = names.value;
    document.querySelector('.text-error').textContent="";
    } catch (e) {
        document.querySelector('.text-error').textContent=e;
    }
});

const phone = document.querySelector('#phone');
phone.addEventListener('input',function(){
    if(phone.value.length==0){
        document.querySelector('.phone-error').textContent="";
        return;
    }
    try {
        (new Contact()).phone = phone.value;
        document.querySelector('.phone-error').textContent="";
        } catch (e) {
            document.querySelector('.phone-error').textContent=e;
        }
});

checkForUpdate();

});



const checkForUpdate = () => {
    const addressBookJSON = localStorage.getItem('editEmp');
    isUpdate = addressBookJSON ? true : false;
    if(!isUpdate)
    return;
    contactObj = JSON.parse(addressBookJSON);
    setForm();
  }
  
  const setForm = () => {
    document.querySelector('#name').value=contactObj._name;
    document.querySelector('#address').value=contactObj._address;
    document.querySelector('#city').value=contactObj._city;
    document.querySelector('#state').value=contactObj._state;
    document.querySelector('#zip').value=contactObj._zip;
    document.querySelector('#phone').value=contactObj._phone;
  }

const save = () => {

    let contact = createContact();
    storeToLocalStorage(contact);
    window.location.replace("../pages/home.html");
}
const createContact = () => {

    let person = new Contact();
    person.id = contactObj.id;
    if(!person.id) person.id = createNewID();
    person.name = document.querySelector('#name').value;
    person.address = document.querySelector('#address').value;
    person.city = document.querySelector('#city').value;
    person.state = document.querySelector('#state').value;
    person.zip = document.querySelector('#zip').value;
    person.phone = document.querySelector('#phone').value;
    alert(person.toString());
    return person;
}

const createNewID = () => {
    let personID = localStorage.getItem('PersonID');
    personID = !personID ? 1: (parseInt(personID)+1).toString();
    localStorage.setItem('PersonID',personID);
    return personID;
}

const storeToLocalStorage = (person) => {
    let contactList = JSON.parse(localStorage.getItem("ContactList"));
    if(contactList){
        contactList.push(person);
    } else{
        contactList = [person];
    }
    alert(contactList.toString());
    localStorage.setItem("ContactList", JSON.stringify(contactList));
}

const onreset = () => {
    document.querySelector('#name').value="";
    document.querySelector('#address').value="";
    document.querySelector('#city').selectedIndex=0;
    document.querySelector('#state').selectedIndex=0;
    document.querySelector('#zip').value="";
    document.querySelector('#phone').value="";
}