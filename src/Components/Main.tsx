import { Upload, User, Calendar, MapPin, Hash, Camera, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { IAadhaarData, IApiResponse } from '../types/IAadhaar';

const Main = function () {
    const [frontImage, setFrontImage] = useState<File | null>(null);
    const [backImage, setBackImage] = useState<File | null>(null);
    const [frontPreview, setFrontPreview] = useState<string>('');
    const [backPreview, setBackPreview] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [results, setResults] = useState<IAadhaarData | null>(null);
    const [error, setError] = useState<string>('');

    const handleImageUpload = (file: File, type: 'front' | 'back') => {
        if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const preview = e.target?.result as string;
            if (type === 'front') {
            setFrontImage(file);
            setFrontPreview(preview);
            } else {
            setBackImage(file);
            setBackPreview(preview);
            }
        };
        reader.readAsDataURL(file);
        }
    };

    const handleDrop = (e: React.DragEvent, type: 'front' | 'back') => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files[0]) {
        handleImageUpload(files[0], type);
        }
    };

    const handleSubmit = async () => {
        if (!frontImage || !backImage) {
            setError("Please upload both front and back images");
            return;
        }

        setIsProcessing(true);
        setError("");

        try {
            const formData = new FormData();
            formData.append("frontSide", frontImage);
            formData.append("backSide", backImage);

            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/images`, {
            method: "POST",
            body: formData,
            });

            if (!response.ok) {
            throw new Error("Failed to process Aadhaar");
            }

            const result: IApiResponse = await response.json();

            if (result.success) {
            setResults(result.data.processedData);
            } else {
            setError(result.message || "Something went wrong");
            }
        } catch (error) {
            setError(error instanceof Error ? error.message : "Error while processing Aadhaar");
        } finally {
            setIsProcessing(false);
        }
    };


    const resetForm = () => {
      setFrontImage(null);
      setBackImage(null);
      setFrontPreview('');
      setBackPreview('');
      setResults(null);
      setError('');
    };

    return (
        <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        {!results ? (
          <div className="space-y-8">
            {/* Upload Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 font-medium mb-4">
                  <Camera className="h-5 w-5" />
                  Upload Aadhaar Images
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Front & Back Images</h2>
                <p className="text-gray-600">Please upload clear images of both sides of the Aadhaar card</p>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700">
                  <AlertCircle className="h-5 w-5" />
                  {error}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-8">
                {/* Front Side Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">1</span>
                    </div>
                    Front Side
                  </h3>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      frontPreview
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    onDrop={(e) => handleDrop(e, 'front')}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {frontPreview ? (
                      <div className="space-y-4">
                        <img
                          src={frontPreview}
                          alt="Front side preview"
                          className="mx-auto max-h-48 rounded-lg shadow-md"
                        />
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Front image uploaded</span>
                        </div>
                        <button
                          onClick={() => {
                            setFrontImage(null);
                            setFrontPreview('');
                          }}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Change image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-gray-600 font-medium">Drop your front image here</p>
                          <p className="text-gray-500 text-sm mt-1">or click to browse</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'front');
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Back Side Upload */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-sm">2</span>
                    </div>
                    Back Side
                  </h3>
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 relative ${
                      backPreview
                        ? 'border-green-300 bg-green-50'
                        : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    onDrop={(e) => handleDrop(e, 'back')}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    {backPreview ? (
                      <div className="space-y-4">
                        <img
                          src={backPreview}
                          alt="Back side preview"
                          className="mx-auto max-h-48 rounded-lg shadow-md"
                        />
                        <div className="flex items-center justify-center gap-2 text-green-600">
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-medium">Back image uploaded</span>
                        </div>
                        <button
                          onClick={() => {
                            setBackImage(null);
                            setBackPreview('');
                          }}
                          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                        >
                          Change image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                        <div>
                          <p className="text-gray-600 font-medium">Drop your back image here</p>
                          <p className="text-gray-500 text-sm mt-1">or click to browse</p>
                        </div>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleImageUpload(file, 'back');
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-8 text-center">
                <button
                  onClick={handleSubmit}
                  disabled={!frontImage || !backImage || isProcessing}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                    !frontImage || !backImage
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : isProcessing
                      ? 'bg-blue-600 text-white cursor-wait'
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {isProcessing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing Images...
                    </div>
                  ) : (
                    'Extract Information'
                  )}
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Results Section */
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full text-green-700 font-medium mb-4">
                  <CheckCircle className="h-5 w-5" />
                  Extraction Completed
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Extracted Information</h2>
                <p className="text-gray-600">Here are the details extracted from your Aadhaar card</p>
              </div>

              <div className="grid gap-6 max-w-3xl mx-auto">
                {/* Name */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">Full Name</h3>
                      <p className="text-xl font-bold text-gray-900">{results.name}</p>
                    </div>
                  </div>
                </div>

                {/* Aadhaar Number */}
                <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-100 rounded-lg">
                      <Hash className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">Aadhaar Number</h3>
                      <p className="text-xl font-bold text-gray-900 font-mono">{results.aadhaarNumber}</p>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Date of Birth */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <Calendar className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">Date of Birth</h3>
                        <p className="text-lg font-bold text-gray-900">{results.dateOfBirth}</p>
                      </div>
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border border-orange-100">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-orange-100 rounded-lg">
                        <User className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">Gender</h3>
                        <p className="text-lg font-bold text-gray-900">{results.gender}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-gradient-to-r from-slate-50 to-gray-50 rounded-xl p-6 border border-slate-100">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-slate-100 rounded-lg">
                      <MapPin className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-1">Address</h3>
                      <p className="text-lg text-gray-900 leading-relaxed">{results.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex gap-4 justify-center">
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Extract Another Card
                </button>
                <button
                  onClick={() => {
                    const data = JSON.stringify(results, null, 2);
                    const blob = new Blob([data], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'aadhaar-data.json';
                    a.click();
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  Download JSON
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    )
};

export default Main;