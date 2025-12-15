'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, ArrowLeft, Camera, Plus, X } from 'lucide-react';
import { ProgressBar } from '@/components/ProgressBar';
import { PHOTO_CONSTRAINTS } from '@/lib/shared';
import { storage, auth } from '@/lib/firebase/client';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { APP_NAME } from '@/lib/constants/app';

export default function PhotosPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<(string | null)[]>([null, null, null]);
  const [uploading, setUploading] = useState<number | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedPhotos = localStorage.getItem('onboarding_photos');
    if (savedPhotos) {
      try {
        setPhotos(JSON.parse(savedPhotos));
      } catch (e) {
        console.error('Failed to parse saved photos:', e);
      }
    }
  }, []);

  const handleFileUpload = useCallback(async (index: number, file: File) => {
    setError('');

    if (!PHOTO_CONSTRAINTS.ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload a JPG or PNG image');
      return;
    }

    const maxSizeBytes = PHOTO_CONSTRAINTS.MAX_SIZE_MB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError(`Image must be under ${PHOTO_CONSTRAINTS.MAX_SIZE_MB}MB`);
      return;
    }

    setUploading(index);

    try {
      if (storage && auth?.currentUser) {
        const storageRef = ref(
          storage,
          `onboarding/${auth.currentUser.uid}/photo_${index}_${Date.now()}`
        );
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);

        setPhotos((prev) => {
          const updated = [...prev];
          updated[index] = url;
          localStorage.setItem('onboarding_photos', JSON.stringify(updated));
          return updated;
        });
      } else {
        const url = URL.createObjectURL(file);
        setPhotos((prev) => {
          const updated = [...prev];
          updated[index] = url;
          localStorage.setItem('onboarding_photos', JSON.stringify(updated));
          return updated;
        });
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('Failed to upload image. Please try again.');
    } finally {
      setUploading(null);
    }
  }, []);

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[index] = null;
      localStorage.setItem('onboarding_photos', JSON.stringify(updated));
      return updated;
    });
  };

  const handleContinue = () => {
    const uploadedCount = photos.filter(Boolean).length;
    if (uploadedCount < PHOTO_CONSTRAINTS.REQUIRED_COUNT) {
      setError(`Please upload ${PHOTO_CONSTRAINTS.REQUIRED_COUNT} photos`);
      return;
    }
    router.push('/onboarding/themes');
  };

  const handleBack = () => {
    router.push('/onboarding/location');
  };

  const uploadedCount = photos.filter(Boolean).length;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left side - Form */}
      <div className="bg-white px-6 py-8 md:px-12 md:py-12 lg:px-16 lg:py-16 flex flex-col min-h-screen lg:min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="font-headline text-xl font-bold bg-gradient-brand-text bg-clip-text text-transparent"
          >
            {APP_NAME}
          </Link>
          <span className="font-body text-[13px] text-[#6E6E73]">Step 3 of 7</span>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <ProgressBar current={3} total={7} variant="light" />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="font-headline text-[clamp(24px,4vw,32px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1D1D1F] mb-2">
              Add your photos
            </h1>
            <p className="font-body text-[15px] text-[#6E6E73] leading-[1.6]">
              Upload {PHOTO_CONSTRAINTS.REQUIRED_COUNT} photos that showcase your style
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-brand-red/5 border border-brand-red/20 rounded-xl text-brand-red text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mb-6">
            {[0, 1, 2].map((index) => (
              <div key={index} className="relative">
                <label
                  className={`block aspect-square rounded-2xl border-2 border-dashed cursor-pointer overflow-hidden transition-all ${
                    photos[index]
                      ? 'border-transparent'
                      : 'border-[#E5E5E7] hover:border-[#D1D1D6] bg-[#F5F5F7]'
                  }`}
                >
                  {photos[index] ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={photos[index]!}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          handleRemovePhoto(index);
                        }}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-[#6E6E73]">
                      {uploading === index ? (
                        <div className="animate-spin w-8 h-8 border-2 border-brand-red border-t-transparent rounded-full" />
                      ) : (
                        <>
                          <Plus className="w-8 h-8 mb-2" strokeWidth={1.5} />
                          <span className="text-xs font-medium">
                            {index === 0 ? 'Profile' : `Photo ${index + 1}`}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(index, file);
                    }}
                    className="hidden"
                    disabled={uploading !== null}
                  />
                </label>
              </div>
            ))}
          </div>

          <p className="text-sm text-[#6E6E73] text-center mb-8">
            {uploadedCount}/{PHOTO_CONSTRAINTS.REQUIRED_COUNT} photos uploaded &bull; Max{' '}
            {PHOTO_CONSTRAINTS.MAX_SIZE_MB}MB each
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3.5 border border-[#1D1D1F]/20 rounded-full font-headline font-semibold text-[#1D1D1F] hover:bg-[#F5F5F7] transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <button
              type="button"
              onClick={handleContinue}
              className="flex-1 py-3.5 bg-black text-white font-headline font-semibold rounded-full hover:-translate-y-0.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition-all duration-[400ms] ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Gradient visual */}
      <div className="hidden lg:flex bg-gradient-brand relative overflow-hidden items-center justify-center">
        <div className="absolute -top-[40%] -right-[40%] w-[80%] h-[80%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,transparent_50%)]" />

        <div className="relative z-10 text-center px-12">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-[16px] border border-white/[0.08] rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Camera className="w-12 h-12 text-white" strokeWidth={1.5} />
          </div>
          <h2 className="font-headline text-2xl font-semibold text-white mb-3">
            Show your best work
          </h2>
          <p className="font-body text-[15px] text-white/60 max-w-[280px] mx-auto">
            Great photos help clients understand your aesthetic and expertise.
          </p>
        </div>

        {/* Step indicators */}
        <div className="absolute bottom-12 left-12 right-12">
          <div className="flex gap-2">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                  i < 3 ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
