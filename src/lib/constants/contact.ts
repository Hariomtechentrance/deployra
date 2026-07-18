function mapsSearchUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

function mapsEmbedUrl(query: string) {
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
}

const OFFICE_QUERIES = {
  nashik: "2P23+VX5, Shramik Nagar, Nashik, Maharashtra 422012",
  bengaluru:
    "Hosur Rd, near Furniture World, Bandepalya, Garvebhavi Palya, Bengaluru, Karnataka 560068",
};

export const CONTACT_INFO = {
  email: "deployratech@gmail.com",
  phones: ["+91 73979 62433", "+91 98341 34470"],
  offices: [
    {
      label: "Head Office",
      city: "Nashik",
      mapUrl: mapsSearchUrl(OFFICE_QUERIES.nashik),
      embedUrl: mapsEmbedUrl(OFFICE_QUERIES.nashik),
    },
    {
      label: "Branch Office",
      city: "Bengaluru",
      mapUrl: mapsSearchUrl(OFFICE_QUERIES.bengaluru),
      embedUrl: mapsEmbedUrl(OFFICE_QUERIES.bengaluru),
    },
  ],
} as const;
