import java.util.*;

public class MishnaQuiz {
    private static final List<String> TRACTATES = Arrays.asList(
        "Brachos", "Peah", "Demai", "Kilayim", "Sheviis", "Terumos", "Maaseros", 
        "Maaser Sheni", "Challah", "Orlah", "Bikkurim", "Shabbos", "Eruvin", "Pesachim", 
        "Shekalim", "Yoma", "Sukkah", "Beitzah", "Rosh Hashanah", "Taanis", "Megillah", 
        "Moed Katan", "Chagigah", "Yevamos", "Kesubos", "Nedarim", "Nazir", "Sotah", 
        "Gittin", "Kiddushin", "Bava Kama", "Bava Metzia", "Bava Basra", "Sanhedrin", 
        "Makkos", "Shevuos", "Eduyos", "Avodah Zarah", "Avos", "Horayos", "Zevachim", 
        "Menachos", "Chullin", "Bechoros", "Arachin", "Temurah", "Kerisos", "Meilah", 
        "Tamid", "Middos", "Kinim", "Keilim", "Oholos", "Negaim", "Parah", "Tohoros", 
        "Mikvaos", "Niddah", "Machshirin", "Zavim", "Tevul Yom", "Yadayim", "Uktzim"
    );
    
     private static final int[] COLUMN_SIZES = {11, 12, 7, 10, 11, 12};
    private static final String[] COLUMN_TITLES = {"Zeraim", "Moed", "Nashim", "Nezikin", "Kodshim", "Taharos"};
    private static final Set<String> correctAnswers = new HashSet<>();
    private static final List<List<String>> columns = new ArrayList<>();
    private static final long TIME_LIMIT = 6 * 60 + 13; // 6 minutes and 13 seconds
    
    static {
        int index = 0;
        for (int size : COLUMN_SIZES) {
            List<String> column = new ArrayList<>(Collections.nCopies(size, "[ ]"));
            for (int i = 0; i < size && index < TRACTATES.size(); i++) {
                column.set(i, TRACTATES.get(index));
                index++;
            }
            columns.add(column);
        }
    }
    
    public static void main(String[] args) {
        System.out.println("Welcome to the Mishna Quiz!\n");
        Scanner scanner = new Scanner(System.in);
        long startTime = System.currentTimeMillis();
        
        while (correctAnswers.size() < TRACTATES.size()) {
            long elapsedTime = (System.currentTimeMillis() - startTime) / 1000;
            long remainingTime = TIME_LIMIT - elapsedTime;
            if (remainingTime <= 0) {
                System.out.println("Time is up! You didn't complete the quiz in time.");
                displayMissedTractates();
                break;
            }
            
            displaySlots(remainingTime);
            System.out.print("Enter a tractate name or \"exit\" to end the game: ");
            String answer = scanner.nextLine().trim().toLowerCase();
            
            if (answer.equals("exit")) {
                System.out.println("Thanks for playing! You exited the game with " + (remainingTime / 60) + "m " + (remainingTime % 60) + "s remaining.");
                break;
            }
            
            String matchedTractate = null;
            for (String tractate : TRACTATES) {
                if (tractate.equalsIgnoreCase(answer)) {
                    matchedTractate = tractate;
                    break;
                }
            }
            
            if (matchedTractate == null) {
                System.out.println("Incorrect. Try again.\n");
            } else if (correctAnswers.contains(matchedTractate)) {
                System.out.println("You already entered that tractate. Try another.\n");
            } else {
                correctAnswers.add(matchedTractate);
                System.out.println("Correct!\n");
            }
            
            if (correctAnswers.size() == TRACTATES.size()) {
                System.out.println("Congratulations! You have correctly entered all 63 tractates before the time ran out!");
                System.out.println("You finished with " + (remainingTime / 60) + "m " + (remainingTime % 60) + "s remaining.");
                break;
            }
        }
        
        scanner.close();
    }
    
    private static void displaySlots(long remainingTime) {
        int maxRows = Arrays.stream(COLUMN_SIZES).max().orElse(0);
        
        System.out.println("Time remaining: " + remainingTime / 60 + "m " + remainingTime % 60 + "s");
        
        for (int i = 0; i < COLUMN_TITLES.length; i++) {
            System.out.printf("%-15s", COLUMN_TITLES[i]);
        }
        System.out.println();
        
        for (int row = 0; row < maxRows; row++) {
            for (int col = 0; col < columns.size(); col++) {
                if (row < columns.get(col).size()) {
                    String tractate = columns.get(col).get(row);
                    System.out.printf("%-15s", correctAnswers.contains(tractate) ? tractate : "[ ]");
                } else {
                    System.out.print("               ");
                }
            }
            System.out.println();
        }
        System.out.println();
    }
    
    private static void displayMissedTractates() {
        System.out.println("You missed the following tractates:");
        for (String tractate : TRACTATES) {
            if (!correctAnswers.contains(tractate)) {
                System.out.println(tractate);
            }
        }
    }
}
