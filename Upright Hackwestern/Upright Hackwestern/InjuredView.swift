//
//  InjuredView.swift
//  Upright Hackwestern
//
//  Created by Ali Mohammed-Ali on 2024-12-01.
//

import SwiftUI
import AudioToolbox

struct InjuredView: View {
    @Binding var isInjured: Bool //whether to keep displaying this view
    @Environment(\.dismiss) var dismissScreen
    @State var vibrationTrigger = 0 //number of vibrations done
    
    var body: some View {
        VStack (alignment: .center, content: {
            VStack (alignment: .leading, content: {
                HStack (alignment: .top, content: { // X button
                    Button(
                        action: {
                            isInjured = false
                            dismissScreen()
                        }, //end of button action
                        label: {
                            Image(systemName: "xmark")
                                .foregroundStyle(.black)
                                .font(.largeTitle)
                                .padding(20)
                                .clipShape(RoundedRectangle(cornerRadius: 10))
                        }) //end of button
                    Spacer() //move X mark left
                })
            }) //end of X-mark VStack
            Spacer()
            Text("Are you OK?")
                .font(.largeTitle)
                .bold()
                .padding()
            Text("An sudden injury was detected on your phone.")
                .font(.headline)
                .multilineTextAlignment(.center)
            Text("Your emergency contacts are being informed right now.")
                .font(.subheadline)
                .multilineTextAlignment(.center)
            if #available(iOS 18.0, *) {
                Image(systemName: "phone.down.waves.left.and.right") //red phone
                    .resizable()
                    .scaledToFit()
                    .foregroundStyle(.red)
                    .frame(width: 100)
                    .padding()
                    .symbolEffect(.bounce, options: .repeating.speed(0.7))
                    
                    .onAppear(perform: {

                        DispatchQueue.main.asyncAfter(deadline: .now() + 0.7) {
                            Timer.scheduledTimer(withTimeInterval: (1), repeats: true) { (timer) in
                                AudioServicesPlayAlertSound(SystemSoundID(kSystemSoundID_Vibrate)) //vibrate phone
                                if !isInjured { //if no longer injured then stop vibrating
                                    timer.invalidate()
                                }
                            }
                        } //delay setting of timer
                    }) //end of onAppear
                
            } else {
                Image(systemName: "phone.down.waves.left.and.right") //red phone
                    .resizable()
                    .scaledToFit()
                    .foregroundStyle(.red)
                    .frame(width: 100)
                    .padding()
            }
            Spacer()
        }) //end of main VStack
        .preferredColorScheme(.light)
        //.environment(\.colorScheme, .light)
    }
}

#Preview {
    @State var isInjured = false
    
    InjuredView(isInjured: $isInjured)
}
