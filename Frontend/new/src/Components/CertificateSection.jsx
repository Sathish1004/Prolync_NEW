
import React from 'react';
import { Award, Linkedin, CheckCircle } from 'lucide-react';
// import certificateImg from '../assets/certificate_sample.jpg'; // Placeholder

const CertificateSection = () => {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row gap-8 items-center">
        {/* Left: Image Placeholder */}
        <div className="w-full md:w-1/2 aspect-video bg-gray-100 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-300 relative overflow-hidden group">
            <div className="text-gray-400 flex flex-col items-center">
                <Award size={48} className="mb-2" />
                <span className="text-sm font-medium">Certificate Preview</span>
            </div>
            {/* If actual image exists: <img src={certificateImg} className="absolute inset-0 w-full h-full object-cover" /> */}
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Official Certification</h3>
            <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-600">
                        <strong className="text-gray-900 block">Globally Recognized</strong>
                        Enhance your portfolio with a verified certificate trusted by top companies.
                    </p>
                </li>
                <li className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 mt-1 flex-shrink-0" size={20} />
                    <p className="text-gray-600">
                        <strong className="text-gray-900 block">Instant Generation</strong>
                        Receive your certificate immediately upon completing all course modules.
                    </p>
                </li>
            </ul>
            
            <button className="flex items-center gap-2 bg-[#0077B5] text-white px-5 py-2 rounded-lg font-medium text-sm hover:bg-[#006097] transition w-fit">
                <Linkedin size={18} />
                Shareable on LinkedIn
            </button>
        </div>
    </div>
  );
};

export default CertificateSection;
