import SwiftUI

struct ContactAlertsTab: View { // Form to enter contact details for each profile (first name, last name, phone number) with scrollview of every recorded contact, scroll view gets contact info entered in the past through API endpoint (actually just store on phone, thats easier. only use oAuth to get past fall data)
    let firstName: String
    let lastName: String
    
    @State var firstNameInput = ""
    @State var lastNameInput = ""
    @State var phoneNumberInput = ""
    @StateObject var emergencyModel: EmergencyModel = EmergencyModel()
    
    var body: some View {
        NavigationStack {
            ZStack {
//                Color.white.ignoresSafeArea()
                List {
                    Section (content: {
                        ForEach (emergencyModel.contactsArray) { contact in
//                            let contact = emergencyModel.contactsArray[index]
                            HStack {
                                VStack (alignment: .leading, content: {
                                    Label(title: {
                                        Text("\(contact.firstName) \(contact.lastName)")
                                            .font(.title3)
                                    }, icon: {Image(systemName: "person.fill")})
                                    .padding(.bottom, 10)
                                    
                                    Label(title: {
                                        Text(contact.phoneNumber)
                                            .font(.title3)
                                    }, icon: {Image(systemName: "phone.fill")})
                                })
                                Spacer()
                            } //end of HStack aligning everything to the left
                        } //end of ForEach loop
                        .onDelete(perform: emergencyModel.deleteContacts)
                    }, header: {
                        Text("Contacts List")
                            .font(.title2)
                    })
                    
                } //end of List
                .tint(.black)
                .listStyle(.inset)
            }
                
            Text("Add a new contact") //title
                .font(.title)
                .minimumScaleFactor(0.1)
                .lineLimit(1)
                .padding()
            
                VStack (alignment: .leading, content: { //add new contact box
                    
                    Label(title: {
                        TextField("First name", text: $firstNameInput)
                            .font(.title3)
                    }, icon: {Image(systemName: "person.fill")})
                    .padding(.bottom)
                    Label(title: {
                        TextField("Last name", text: $lastNameInput)
                            .font(.title3)
                    }, icon: {Image(systemName: "person.fill")})
                    .padding(.bottom)
                    Label(title: {
                        TextField("Phone number", text: $phoneNumberInput)
                            .font(.title3)
                    }, icon: {Image(systemName: "phone.fill")})
                    .padding(.bottom)
                    
                    HStack {
                        Spacer()
                        Button (action: {
                            if (!firstNameInput.isEmpty && !lastNameInput.isEmpty && !phoneNumberInput.isEmpty) { //check if textboxes are empty
                                let newContact = EmergencyContact(firstName: firstNameInput, lastName: lastNameInput, phoneNumber: phoneNumberInput)
                                emergencyModel.contactsArray.insert (newContact, at: 0)
                                firstNameInput = ""
                                lastNameInput = ""
                                phoneNumberInput = ""
                            } //end of if statement
                        }, label: {
                            Text("Add contact")
                        })
                        Spacer()
                    }
                }) //end of Add new Contact VStack
                .padding()
//                .frame(width: 300)
//                .background(
//                    RoundedRectangle(cornerRadius: 20)
//                        .foregroundStyle(Color("Light Gray")))
                
                .navigationTitle("Emergency Contacts for \(firstName) \(lastName)")
            } //end of NavigationStack
        .environment(\.colorScheme, .light) //set colorScheme to light
    } //end of some View
}

#Preview {
    ContactAlertsTab(firstName: "Ali", lastName: "Mohammed-Ali")
}
