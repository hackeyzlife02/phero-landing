'use client';

import { useState, useRef, useEffect } from 'react';
import { Loader2, MapPin } from 'lucide-react';

type Prediction = {
  place_id: string;
  structured_formatting: {
    main_text: string;
    secondary_text: string;
  };
};

export type CityData = {
  city: string;
  state: string;
  formatted: string;
};

type CityAutocompleteLightProps = {
  value?: CityData | null;
  onCitySelect: (cityData: CityData) => void;
  placeholder?: string;
  className?: string;
  error?: string;
};

export function CityAutocompleteLight({
  value,
  onCitySelect,
  placeholder = 'Search your city',
  className = '',
  error,
}: CityAutocompleteLightProps) {
  const [inputValue, setInputValue] = useState(value?.formatted || '');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update input when value changes externally
  useEffect(() => {
    if (value?.formatted) {
      setInputValue(value.formatted);
    }
  }, [value?.formatted]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch predictions from our API route (proxies to Google Places)
  const fetchPredictions = async (text: string) => {
    if (!text || text.length < 2) {
      setPredictions([]);
      setShowResults(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `/api/places/autocomplete?input=${encodeURIComponent(text)}`
      );
      const data = await response.json();

      if (data.predictions) {
        setPredictions(data.predictions);
        setShowResults(true);
      } else {
        setPredictions([]);
        setShowResults(false);
      }
    } catch (error) {
      console.error('Error fetching predictions:', error);
      setPredictions([]);
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  // Fetch place details to get city and state
  const fetchPlaceDetails = async (placeId: string): Promise<CityData | null> => {
    try {
      const response = await fetch(`/api/places/details?place_id=${placeId}`);
      const data = await response.json();

      if (data.city && data.state) {
        return data;
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    }

    return null;
  };

  // Debounced search
  const handleChangeText = (text: string) => {
    setInputValue(text);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchPredictions(text);
    }, 300);
  };

  // Handle prediction selection
  const handleSelectPrediction = async (prediction: Prediction) => {
    const displayText = prediction.structured_formatting.main_text;
    const secondaryText = prediction.structured_formatting.secondary_text;
    const formatted = `${displayText}, ${secondaryText}`;

    setInputValue(formatted);
    setShowResults(false);
    setPredictions([]);

    // Fetch detailed place info
    const placeDetails = await fetchPlaceDetails(prediction.place_id);

    if (placeDetails) {
      onCitySelect({
        city: placeDetails.city || displayText,
        state: placeDetails.state,
        formatted,
      });
    } else {
      // Fallback: parse from secondary text (usually "State, USA")
      const statePart = secondaryText.split(',')[0]?.trim();
      onCitySelect({
        city: displayText,
        state: statePart || '',
        formatted,
      });
    }
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6E73]" />
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => handleChangeText(e.target.value)}
          onFocus={() => {
            if (predictions.length > 0) setShowResults(true);
          }}
          className="w-full pl-12 pr-12 py-3.5 bg-[#F5F5F7] border-transparent rounded-xl text-[#1D1D1F] placeholder-[#6E6E73] focus:bg-white focus:border-[#1D1D1F]/20 focus:ring-2 focus:ring-[#1D1D1F]/10 focus:outline-none transition-all"
          autoComplete="off"
        />

        {loading && (
          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6E6E73] animate-spin" />
        )}
      </div>

      {error && (
        <p className="text-brand-red text-sm mt-2">{error}</p>
      )}

      {showResults && predictions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-[#E5E5E7] rounded-xl max-h-[240px] overflow-y-auto z-50 shadow-lg">
          {predictions.map((item) => (
            <button
              key={item.place_id}
              type="button"
              className="w-full text-left px-4 py-3 border-b border-[#E5E5E7] last:border-b-0 hover:bg-[#F5F5F7] transition-colors"
              onClick={() => handleSelectPrediction(item)}
            >
              <div className="font-body text-sm font-medium text-[#1D1D1F] mb-0.5">
                {item.structured_formatting.main_text}
              </div>
              <div className="font-body text-xs text-[#6E6E73]">
                {item.structured_formatting.secondary_text}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
