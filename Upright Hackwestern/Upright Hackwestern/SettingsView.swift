//
//  SettingsVIew.swift
//  Upright Hackwestern
//
//  Created by Yang Li on 2024-12-01.
//

import SwiftUI

struct SettingsView: View {
    @Binding var sensitivity: Double
    @Binding var domain: String
    
    var body: some View {
        VStack {
            HStack {
                let num = (62-sensitivity)*(10/6)
                Text("Sensitivity: \(String(format: "%.2f", num))")
                    .minimumScaleFactor(0.1)
                    .lineLimit(1)
                Slider(value: $sensitivity, in: 2...60)
            }
            TextField("Enter Domain", text: $domain)
        }
        .padding()
    }
}

#Preview {
    SettingsView(sensitivity: .constant(10), domain: .constant("www.example.com"))
}
