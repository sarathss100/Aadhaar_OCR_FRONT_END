import { FileText } from 'lucide-react';

const Header = function () {
    return (
        <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <FileText className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Aadhaar Document Extractor</h1>
              <p className="text-blue-100">Extract information from Aadhaar cards quickly and accurately</p>
            </div>
          </div>
        </div>
      </header>
    )
};

export default Header;