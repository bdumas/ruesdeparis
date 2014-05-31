import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * Transformation and processing of the CSV file into a JSON file.
 * (Just a quick and pretty dirty script which does the job)
 */
public class CsvToJson {

	/** Name of the output file */
	private final static String JSON_FILE_NAME = "ruesdeparis.json";
	
	/** Encoding of the input files */
	private final static String CHARSET_INPUT_FILE = "ISO-8859-1";
	
	/** Encoding of the output files */
	private final static String CHARSET_OUTPUT_FILE = "UTF-8";
	
	private final static String REGEXP_CSV_SPLIT = ";(?=([^\"]*\"[^\"]*\")*[^\"]*$)";
	
	/**
	 * @param args
	 *            CSV file name
	 */
	public static void main(String[] args) {
		Path csvFilePath = Paths.get(args[0]);
		System.out.println("Parsing the file " + csvFilePath);

		PrintWriter writer = null;
		int l = 1;
		try {
			writer = new PrintWriter(JSON_FILE_NAME, CHARSET_OUTPUT_FILE);
			writer.print("{");

			try (BufferedReader reader = Files.newBufferedReader(csvFilePath,
					Charset.forName(CHARSET_INPUT_FILE))) {
				String lineFromFile = "";
				
				while ((lineFromFile = reader.readLine()) != null) {
					while (lineFromFile
							.split(REGEXP_CSV_SPLIT).length != 30) {
						lineFromFile += reader.readLine();
					}
					processCsvLine(lineFromFile, writer);
					l++;
				}

			} catch (IOException x) {
				System.err.format("IOException: %s%n", x);
			}

			writer.print("}");

		} catch (FileNotFoundException | UnsupportedEncodingException e) {
			e.printStackTrace();

		} finally {
			writer.close();
		}
		
		System.out.println("Done. " + l + "lines processed.");
	}

	private static void processCsvLine(String csvLine, PrintWriter writer) {
		Street street = new Street();
		String[] fields = csvLine.split(REGEXP_CSV_SPLIT);
		street.setStreet(fields[3]);
		street.setCleanedStreet(reduce(fields[3]));
		street.setDistrict(fields[8].replaceAll("\"", ""));
		street.setHistory(fields[6].replaceAll("\"", "")
				.replace("Historique.~", "#HISTO#").replace("Historique. ~", "#HISTO#").replace("historique.~", "#HISTO#").replace("historique. ~", "#HISTO#")
				.replace("Orig. du nom.~", "#ORIG#").replace("Orig. du nom. ~", "#ORIG#").replace("Origine du nom. ~", "#ORIG#").replace("Origine du nom.~", "#ORIG#").replace("Orig du nom.~", "#ORIG#").replace("Orig.~", "#ORIG#").replace("Orig. du Nom. ~", "#ORIG#").replace("Orig.du nom.~", "#ORIG#").replace("Orig.du nom. ~", "#ORIG#")
				.replace("Historique et orig. du nom. ~", "#HISTORIG#").replace("Historique et origine du nom. ~", "#HISTORIG#")
				.replace("Monument classé.~", "#MC#").replace("Monument classé. ~", "#MC#")
				.replace("Monuments classés.~", "#MCS#").replace("Monuments classés. ~", "#MCS#")
				.replace("Site classé.~", "#SC#").replace("Site classé. ~", "#SC#").replace("Site Classé. ~", "#SC#").replace("Site cassé. ~", "#SC#")
				.replace("Nota.~", "#NOT#").replace("Nota. ~", "#NOT#")
				.replace("Ouverture.~", "#OUV#")
				.replace("Observation.~", "#OBS#")
				.replace("Dénomination. ~", "#DENOM#"));
		street.setArr(fields[29]);

		writer.println("\"" + street.getCleanedStreet() + "\":{\"n\":\""
				+ street.getStreet() + "\",\"d\":\"" + street.getDistrict()
				+ "\",\"h\":\"" + street.getHistory() + "\",\"a\":\""
				+ street.getArr() + "\"},");
	}

	private static String reduce(String address) {
		String result = address;
		result = result.toLowerCase();
		result = result.replaceAll("[ '/,;:_\"\\\\\\.\\!\\?\\-\\(\\)\\[\\{\\]\\}]", "");
		result = result.replaceAll("[àâä]", "a");
		result = result.replaceAll("[éèëê]", "e");
		result = result.replaceAll("[iïî]", "i");
		result = result.replaceAll("[öô]", "o");
		result = result.replaceAll("[üûù]", "u");
		result = result.replaceAll("[ÿŷ]", "y");
		result = result.replaceAll("ç", "c");
		result = result.substring(0, Math.min(24, result.length()));
		return result;
	}

	/**
	 * Street data as exported to JSON.
	 */
	public static class Street {
		private String street;
		private String cleanedStreet;
		private String history;
		private String district;
		private String arr;
		
		public String toString() {
			return street + "\n" + cleanedStreet + "\n" + history + "\n" + district + "\n" + arr + "\n";
		}

		public String getStreet() {
			return street;
		}

		public void setStreet(String street) {
			this.street = street;
		}

		public String getCleanedStreet() {
			return cleanedStreet;
		}

		public void setCleanedStreet(String cleanedStreet) {
			this.cleanedStreet = cleanedStreet;
		}

		public String getHistory() {
			return history;
		}

		public void setHistory(String history) {
			this.history = history;
		}

		public String getDistrict() {
			return district;
		}

		public void setDistrict(String district) {
			this.district = district;
		}

		public String getArr() {
			return arr;
		}

		public void setArr(String arr) {
			this.arr = arr;
		}
	}
}
