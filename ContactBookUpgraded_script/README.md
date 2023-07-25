NodeJs script that:

1. connects to the private Ganache blockchain;
2. connects to the ContactBook smart contract;
3. calls and outputs to the console the result of the "getContact(<index>)" call, where instead of <index> – the number of the manually added contact;
4. calls the "addContact()" method with an arbitrary name and thus adds 1 more contact to the ContactBook;
5. calls the method "ContactBook.callContact(<index>)", where instead of <index> - the number of the contact added by the script.
