import SwiftUI

enum Severity {
    case severe, high, medium, low, none
    
    var description: String {
        switch self {
            case .severe: return "Severe"
        case .high: return "High"
        case .medium: return "Medium"
        case .low: return "Low"
        case .none: return "None"
        }
    }
}

class EmergencyModel: ObservableObject {
    
    @Published var contactsArray: [EmergencyContact] = [] //everytime this variable (array) gets updated, SwiftUI redraws any views (defined with @ObservableObject) that depend on this value
    
    init() {
        getContacts()
    }
    
    func getContacts() { //get contacts from app storage (extra)
        contactsArray.append(EmergencyContact(firstName: "Yang", lastName: "Li", phoneNumber: "519-881-3333"))
        contactsArray.append(EmergencyContact(firstName: "Donald", lastName: "Trump", phoneNumber: "519-667-8328"))
        contactsArray.append(EmergencyContact(firstName: "Joe", lastName: "Biden", phoneNumber: "9997778328"))
    }
    
    func deleteContacts(index: IndexSet) {
        contactsArray.remove(atOffsets: index)
    }
    
}

struct EmergencyContact: Identifiable, Encodable {
    //emergency contact details
    let firstName: String
    let lastName: String
    let phoneNumber: String
    let id: String
    
    init(firstName: String, lastName: String, phoneNumber: String) {
        self.firstName = firstName
        self.lastName = lastName
        self.phoneNumber = phoneNumber
        self.id = UUID().uuidString
    }
}

class InjuriesModel: ObservableObject {
    
    @Published var injuriesArray: [Injury] = []
    @Published var isLoading: Bool = false
    
    init() {
        getInjuries()
    }
    
    func getInjuries() {
        isLoading = true
        injuriesArray.append(Injury(severity: .high, location: (45.4526426, 45.4562), date: Date(timeIntervalSince1970: 1732992661)))
        injuriesArray.append(Injury(severity: .severe, location: (11.41350, 55.2), date: Date(timeIntervalSince1970: 1732962668)))
        injuriesArray.append(Injury(severity: .low, location: (71.4135, 42), date: Date(timeIntervalSince1970: 1732992648)))
        injuriesArray.append( Injury(severity: .medium, location: (46.45664, 39.4543), date: Date(timeIntervalSince1970: 1732992369)))
        isLoading = false
    }
    
    func deleteContacts(index: IndexSet) {
        injuriesArray.remove(atOffsets: index)
    }
    
}

struct Injury: Identifiable {
    //info on the fall, severity
    let severity: Severity
    let location: (Float, Float)
    let date: Date
    let id: String
    
    init(severity: Severity, location: (Float, Float), date: Date) {
        self.severity = severity
        self.location = (Float(round(location.0 * 1000) / 1000), Float(round(location.1 * 1000) / 1000))
        self.date = date
        self.id = UUID().uuidString
    }
}

