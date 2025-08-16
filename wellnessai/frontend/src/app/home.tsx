// app/page.tsx
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-cyan-100 flex justify-center items-start p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
        
        {/* Recent Chats Section */}
        <div className="bg-cyan-200 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Chats</h2>
          <ul className="space-y-4 text-gray-800">
            <li className="bg-cyan-300 px-3 py-2 rounded-full inline-block">
              “Can you suggest a diet for diabetes control?”
            </li>
            <li>“I’m feeling mild fever since last night.”</li>
            <li>“I have a headache and low energy today.”</li>
            <li>“What are the side effects of this medicine?”</li>
            <li>“Can you remind me to take my BP tablets daily?”</li>
          </ul>
        </div>

        {/* Hospitals Section */}
        <div className="flex flex-col gap-6">
          
          {/* Hospital 1 */}
          <div className="bg-gray-100 rounded-xl shadow-lg flex gap-4 p-4 items-center">
            <Image
              src="/hospital1.jpg" // replace with your hospital image
              alt="Narayana Hospital"
              width={200}
              height={120}
              className="rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">Narayana Hospital</h3>
              <p className="text-sm text-gray-600">
                Madhyamgram, North 24 Parganas
              </p>
              <p className="text-sm text-gray-600">OPD: 10:00 AM – 12:00 PM</p>
              <p className="text-sm font-medium text-gray-800">
                +91 9564099834
              </p>
            </div>
          </div>

          {/* Hospital 2 */}
          <div className="bg-gray-100 rounded-xl shadow-lg flex gap-4 p-4 items-center">
            <Image
              src="/hospital2.jpg" // replace with your hospital image
              alt="Medica Superspecialty Hospital"
              width={200}
              height={120}
              className="rounded-lg object-cover"
            />
            <div>
              <h3 className="font-semibold">Medica Superspecialty Hospital</h3>
              <p className="text-sm text-gray-600">Mukundapur, Kolkata</p>
              <p className="text-sm text-gray-600">OPD: 9:00 AM – 7:00 PM</p>
              <p className="text-sm font-medium text-gray-800">
                +91 7076102587
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
