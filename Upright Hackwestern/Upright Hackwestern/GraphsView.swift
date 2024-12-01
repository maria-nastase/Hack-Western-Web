import SwiftUI

import CoreMotion

struct GraphsView: View {
    
    let motionManager = CMMotionManager()
    let queue = OperationQueue()
    
    @State var pitch: [Double] = []
    //@State var yaw
    
    @Environment(\.dismiss) var dismissScreen
    
    var body: some View {
        VStack {
            HStack {
                Button(
                    action: {
                        dismissScreen()
                    }, //end of button action
                    label: {
                        Image(systemName: "xmark")
                            .foregroundStyle(.black)
                            .font(.largeTitle)
                            .padding(20)
                            .clipShape(RoundedRectangle(cornerRadius: 10))
                    }) //end of button
                Spacer()
            }
            Spacer()
            Text("X Accelerometer")
                .font(.title)
                .padding()
            Spacer()
        }
    }
}

#Preview {
    GraphsView()
}
