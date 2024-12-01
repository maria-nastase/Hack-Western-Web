//
//  HomeTab.swift
//  Upright Hackwestern
//
//  Created by Ali Mohammed-Ali on 2024-11-30.
//

import SwiftUI

struct HomeTab: View { //a start recording falls button, show graph fullscreen pop up, past falls history (requires oAuth accesss to get this data from database)
   
    let firstName: String
    let lastName: String
    let dateFormatter: DateFormatter = {
        let formatter = DateFormatter()
        formatter.timeStyle = .short
        formatter.dateStyle = .medium
        return formatter
    }()
    //@State var isRecording = false
    @State var showGraphs = false
    @StateObject var injuriesViewModel: InjuriesModel
    
    var body: some View {
        NavigationStack {
            VStack (content: {
                Spacer()
                List {
                    Section (content: {
                        ForEach (injuriesViewModel.injuriesArray) { injury in
                            VStack (alignment: .leading, content: {
                                let formattedLat = String(format: "%.3f", injury.location.0)
                                let formattedLong = String(format: "%.3f", injury.location.1)
                                Text("\(injury.severity) fall".capitalized)
                                    .foregroundStyle(severityColor(severity: injury.severity))
                                    .bold()
                                    
                                Text(dateFormatter.string(from: injury.date)
                                     + "\nLocated at (\(formattedLat), \(formattedLong))")
                                .multilineTextAlignment(.leading)
                            }) //end of injury box VStack
                            .padding()
                        } //end of ForEach
                        }, header: {
                                Text("Past injuries for \(firstName) \(lastName)")
                                .font(.title3)
                                .minimumScaleFactor(0.1)
                                .lineLimit(1)
                        }) //end of Section
                    } //end of List
                    .tint(.black)
                    .listStyle(.inset)
            }) //main VStack
            .navigationTitle("Upright")
        } //NavigationStack
        .environment(\.colorScheme, .light)
    }
    
    func severityColor(severity: Severity) -> Color {
        if severity == .severe {
            return Color( #colorLiteral(red: 0.5807225108, green: 0.066734083, blue: 0, alpha: 1) )
        } else if severity == .high {
            return Color( #colorLiteral(red: 1, green: 0.1491314173, blue: 0, alpha: 1) )
        } else if severity == .medium {
            return Color( #colorLiteral(red: 1, green: 0.5781051517, blue: 0, alpha: 1) )
        } else if severity == .low {
            return Color( #colorLiteral(red: 0.5738074183, green: 0.5655357838, blue: 0, alpha: 1) )
        }
        return .yellow
    }
    
} //end of HomeTab struct View

#Preview {
    HomeTab(firstName: "Ali", lastName: "Mohammed-Ali", injuriesViewModel: InjuriesModel())
}
