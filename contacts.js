const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("db/contacts.json");

const listContacts = async () => {
  try {
    const file = await fs.readFile(contactsPath, "utf8");
    const parsedFile = JSON.parse(file);

    console.table(parsedFile);
    return parsedFile;
  } catch (error) {
    console.log(error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const file = await fs.readFile(contactsPath, "utf8");
    const parsedFile = JSON.parse(file);

    const currentContact = parsedFile.find(
      (contact) => contact.id === contactId
    );

    console.log("currentContact", currentContact);
    return currentContact;
  } catch (error) {
    console.log(error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const file = await fs.readFile(contactsPath, "utf8");
    const parsedFile = JSON.parse(file);

    const contactsWithoutCurrent = parsedFile.filter(
      (contact) => contact.id !== contactId
    );

    const nextContacts = JSON.stringify(contactsWithoutCurrent);

    await fs.writeFile(contactsPath, nextContacts, "utf8");

    const nextFile = await fs.readFile(contactsPath, "utf8");
    const nextParsedFile = JSON.parse(nextFile);

    console.table(nextParsedFile);
  } catch (error) {
    console.log(error.message);
  }
};

const addContact = async ({ name, email, phone }) => {
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  try {
    const file = await fs.readFile(contactsPath, "utf8");
    const parsedFile = JSON.parse(file);

    const contactsWithNewContact = [...parsedFile, newContact];

    const nextFileData = JSON.stringify(contactsWithNewContact);

    await fs.writeFile(contactsPath, nextFileData, "utf8");
    const nextFile = await fs.readFile(contactsPath, "utf8");
    const nextParsedFile = JSON.parse(nextFile);

    console.table(nextParsedFile);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
