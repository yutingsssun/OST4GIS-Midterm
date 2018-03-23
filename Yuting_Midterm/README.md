# Midterm

This project tries to layout U.S. primary commercial airports and show each airport's profile when the mouse hover over that airport.

Data
1. Airport data originally from FAA's National Airspace System Resource Aeronautical Data Product, in shapefile format, reffering to https://catalog.data.gov/dataset/airports-national-national-geospatial-data-asset-ngda-airports
2. Passenger-boarding data and all-cargo data are extracted from the Air Carrier Activity Information System (ACAIS), referring to https://www.faa.gov/airports/planning_capacity/passenger_allcargo_stats/passenger/

Data Processing
1. Join passenger-boarding data and all-cargo data into shapefile's attribute table in ArcGIS;
2. Convert shapefile to GeoJosn file;
3. Upload GeoJosn file to GitHub;
4. Use ajax() to extract data from GitHub remote server.

Slideshow
1. U.S. major commercial airports color-coded by its hub category;
2. U.S. major commercial airports color-coded based on each airport's land area;
3. U.S. top 30 passenger airports according to the rank of enplanements in 2016;
4. U.S. top 30 cargo airports according to the rank of landed weight in 2016;
5. New York City's primary three airports, including JFK, LGA, and EWR.
