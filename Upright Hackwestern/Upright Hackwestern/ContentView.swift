//
//  ContentView.swift
//  Upright Hackwestern
//
//  Created by Ali Mohammed-Ali on 2024-11-30.
//

import SwiftUI
import CoreLocation
import Foundation



struct ContentView: View {
    let firstName = "Ali" //the person getting injured, the user of this app
    let lastName = "Mohammed-Ali"
    let phoneNumber = "+16308"
    
    var locManager = CLLocationManager()
    
    let addUserString="/api/user"
    let createFallString="/api/alert"
    let injuryAlertCooldown: Int = 1 //number of seconds between allowed injury reports
    
    @State var MULTIPLIER: Double = 36.0
    @State var urlString: String = "" //URL of our web server
    
    @StateObject var injuriesModel = InjuriesModel()
    @State var lastInjury: Date = Date(timeIntervalSince1970: TimeInterval(0)) //set the lastInjury to be really far back in time
    @State var injuredState = false //user is in injured state, InjuredView showing
    @State var selectedTab: Int = 0 //the id of the selected tab
    @StateObject private var detector = MotionDetector(updateInterval: 0.01)
    
    var body: some View {
        TabView(selection: $selectedTab) {
            HomeTab(firstName: firstName, lastName: lastName,injuriesViewModel: injuriesModel)
                .tabItem {
                    Label("Injuries", systemImage: "figure.fall")
                }
                .tag(0)
                .onAppear(){
                    locManager.requestWhenInUseAuthorization()
                    detector.start()
                    startFallMonitoring()
                    lastInjury = Date.now.addingTimeInterval(TimeInterval(-injuryAlertCooldown*1000))
                    UIApplication.shared.windows.first?.rootViewController?.overrideUserInterfaceStyle = .light //set fixed theme to light theme
                }
            ContactAlertsTab(firstName: firstName, lastName: lastName)
                .tabItem {
                    Label("Add Contacts", systemImage: "person.crop.circle")
                }
                .tag(1)
            SettingsView(sensitivity: $MULTIPLIER, domain: $urlString)
            .tabItem {
                Label("Settings", systemImage: "gear")
            }
            .tag(2)
        }
        .fullScreenCover(isPresented: $injuredState, onDismiss: {
            lastInjury = Date.now //reset the lastInjury cooldown after the InjuryView has been dismissed
        }, content: {InjuredView(isInjured: $injuredState)})
    } //end of var body
    
    func startFallMonitoring(){
            Timer.scheduledTimer(withTimeInterval: 0.2, repeats: true) { _ in
                let fallLevel = fallDetected()
                if (fallLevel != .none && !injuredState &&  Int(Date.now.timeIntervalSince1970) - Int(lastInjury.timeIntervalSince1970) > injuryAlertCooldown) { //if fall detected and user is not already in an injured state
                    var currentLocation: CLLocation!
                    currentLocation = locManager.location
                    if (currentLocation != nil) {
                        print(currentLocation!)
                    } else {
                        print("Can't get location")
                    }
                    //let userID=addUserToDatabase(user: User(fname: firstName, lname: lastName, severity:FALL_TYPES[fallLevel],number: phoneNumber,  longitude: 0.0,latitude: 0.0))
                    sendFallInfo(userID:11,currentLocation: currentLocation, fallLevel: fallLevel)
                    let newInjury = Injury(severity: fallLevel,  location: (Float(currentLocation.coordinate.latitude), Float(currentLocation.coordinate.longitude)), date: Date.now)
                    injuriesModel.injuriesArray.append(newInjury)
                    injuredState = true
                    print("I FELL AND I CAN'T GET UP")

                }
            }
        }
        
    func fallDetected() -> Severity {
        var totAccel=0.0;
        for (index,_) in detector.zAccelerations.enumerated(){
            let absAccel=getAbsAccel(index:index)
            totAccel+=absAccel
        }
        
        if totAccel>2*MULTIPLIER{ //debugging
            print("Multiplier: \(MULTIPLIER)")
            print("Total Acceleration: \(totAccel)")
            print("2*Multiplier: \(2*MULTIPLIER)")
        }
        
        if totAccel>6.0*MULTIPLIER
        {
            return .severe
        }
        else if totAccel>4.5*MULTIPLIER
        {
            return .high
        }
        else if totAccel>3*MULTIPLIER
        {
            return .medium
        }
        else if totAccel>2*MULTIPLIER{
            
            return .low
        }
        return .none
    }
        
        func getAbsAccel(index:Int)->Double{
            var xAccel=0.0,yAccel=0.0,zAccel=0.0
            var absAccel=0.0
            xAccel=detector.xAccelerations[index]
            yAccel=detector.yAccelerations[index]
            zAccel=detector.zAccelerations[index]
            absAccel=sqrt(xAccel*xAccel+yAccel*yAccel+zAccel*zAccel)
            return absAccel
        }

        func makeGetRequest() {
            // Define the URL
            if (urlString.isEmpty) {
                return
            }
            guard let url = URL(string: urlString) else {
                print("Invalid URL")
                return
            }

            // Create a URLSession data task
            let task = URLSession.shared.dataTask(with: url) { data, response, error in
                // Handle errors
                if let error = error {
                    print("Error: \(error.localizedDescription)")
                    return
                }

                // Check for valid response
                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
                    print("Invalid response or status code")
                    return
                }

                // Parse the data
                if let data = data {
                    if let jsonString = String(data: data, encoding: .utf8) {
                        print("Response JSON: \(jsonString)")
                    }
                }
            }

            // Start the request
            task.resume()
        }
        
    func addUserToDatabase(user:User)->Int {
        var returner = -1
        // Define the URL
        if (urlString.isEmpty) {
            return -1
        }
        guard let url = URL(string: urlString+addUserString) else {
            print("Invalid URL")
            return -1
        }

        // Create the request
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"

        do {
            // Serialize the struct to JSON data
            let jsonData = try JSONEncoder().encode(user)

            // Convert JSON data to a string for readability
            if let jsonString = String(data: jsonData, encoding: .utf8) {
                print("JSON String: \(jsonString)")
            }
            request.httpBody = jsonData

            // Create the task
            let task = URLSession.shared.dataTask(with: request) { data, response, error in
                // Handle errors
                if let error = error {
                    print("Error: \(error.localizedDescription)")
                    return
                }

                // Check for a valid response
                guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
                    print("Invalid response or status code")
                    return
                }
                do {
                    if let jsonResponse = try JSONSerialization.jsonObject(with: data!, options: []) as? [String: Any] {
                            print("JSON Response: \(jsonResponse)")
                        returner = jsonResponse["id"] as Any as! Int
                        print(returner)
                        } else {
                            print("Unable to cast response as dictionary")
                        }
                    } catch {
                        print("Error parsing JSON: \(error.localizedDescription)")
                    }
            }

            // Start the request
            task.resume()
        } catch {
            print("Error encoding User to JSON: \(error)")
        }
        return returner
    }
        
    func sendFallInfo(userID:Int,currentLocation:CLLocation,fallLevel: Severity) {
        // Define the URL
        if (urlString.isEmpty) {
            return
        }
        guard let url = URL(string: urlString+createFallString) else {
            print("Invalid URL")
            return
        }

        // Create the request
        var request = URLRequest(url: url)
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpMethod = "POST"

        // Define the JSON payload
                let parameters: [String:Any] = [
                    "userId": 11,
                    "severity": fallLevel.description,
                    "longitude": currentLocation.coordinate.longitude,
                    "latitude": currentLocation.coordinate.latitude
                ]

                // Convert parameters to JSON data
                guard let httpBody = try? JSONSerialization.data(withJSONObject: parameters, options: []) else {
                    print("Failed to serialize JSON")
                    return
                }
                request.httpBody = httpBody

                // Create the task
                let task = URLSession.shared.dataTask(with: request) { data, response, error in
                    // Handle errors
                    if let error = error {
                        print("Error: \(error.localizedDescription)")
                        return
                    }

                    // Check for a valid response
                    guard let httpResponse = response as? HTTPURLResponse, httpResponse.statusCode == 200 else {
                        print("Invalid response or status code")
                        return
                    }

                    // Parse the response
                    if let data = data {
                        if let responseString = String(data: data, encoding: .utf8) {
                            print("Response: \(responseString)")
                        }
                    }
                }

                // Start the request
                task.resume()
    }
}

struct RecordButton: View {
    var body: some View {
        Button {
            //isRecording.toggle()
        }
        label: {
            Image(systemName: "record.circle")
                .resizable()
                .scaledToFit()
                .foregroundStyle(.red, .pink)
                .frame(width: 70, height: 70)
                .onTapGesture {
                    withAnimation (.easeInOut(duration: 0.5).repeatForever(autoreverses: true)) {
                       // isRecording.toggle()
                    }
                }
        }//end of label parameter
        //.symbolEffect(.bounce.up, value: isRecording)
    }
}

#Preview {
    ContentView()
}
