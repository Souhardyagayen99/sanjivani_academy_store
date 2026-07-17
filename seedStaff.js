require('dotenv').config();
const mongoose = require('mongoose');
const Staff = require('./models/Staff');

const staffData = [
  { "id": 53, "name": "Adhav Madhuri Abhishek" },
  { "id": 39, "name": "Aher Arti Rajaram" },
  { "id": 67, "name": "Ambare Pranjali Swapnil" },
  { "id": 65, "name": "Ambare Varsha Rajendra" },
  { "id": 80, "name": "Amisha Roy Chowdhury" },
  { "id": 5, "name": "Anantpalkaur Premjitsingh Sehmbi" },
  { "id": 2, "name": "Anita Vijay Kangane" },
  { "id": 88, "name": "Ankush Mishra" },
  { "id": 1, "name": "Anushrita Singh" },
  { "id": 32, "name": "Ashtekar Nivrutti Pandurang" },
  { "id": 87, "name": "Atiraj Mishra" },
  { "id": 95, "name": "Bachhav Dhanashri Subhash" },
  { "id": 40, "name": "Bagul Aruna Nikhil" },
  { "id": 47, "name": "Bansode Kalyani Shailendra" },
  { "id": 19, "name": "Bansode Prajakta Bhimraj" },
  { "id": 84, "name": "Barokar Gauri Ram / Dr. Shaikh Ziya" },
  { "id": 57, "name": "Bharaskar Gokul Kacharu" },
  { "id": 48, "name": "Bhaskar Geeta Vaibhav" },
  { "id": 15, "name": "Bidve Vaishali Dipak" },
  { "id": 35, "name": "Borde Dipali Ramkrushna" },
  { "id": 30, "name": "Chennana Bhalchandra Narayan" },
  { "id": 60, "name": "Dandu Sandeep Nagnath" },
  { "id": 62, "name": "Dayma Dhanshree" },
  { "id": 90, "name": "Deore Bhagyashri Shivaji" },
  { "id": 81, "name": "Dhanad Kalyani Rambhau" },
  { "id": 14, "name": "Dhokar Shital Padmakar" },
  { "id": 27, "name": "Dhond Seema Ramesh" },
  { "id": 97, "name": "Dongare Kapil Virajsingh" },
  { "id": 103, "name": "Gade Akshada Ashokrao" },
  { "id": 51, "name": "Gade Pragati Mohit" },
  { "id": 77, "name": "Gahire Swati Premsing" },
  { "id": 38, "name": "Gaikwad Jalindar Shivaji" },
  { "id": 114, "name": "Garud Vanmala Vilas" },
  { "id": 79, "name": "Gavande Gaytri Madhukar" },
  { "id": 43, "name": "Gaware Namrata Ashok" },
  { "id": 13, "name": "Ghaywat Akash Navnath" },
  { "id": 11, "name": "Ghorpade Shailaja Eknath" },
  { "id": 75, "name": "Girme Rashmi Rajendra" },
  { "id": 18, "name": "Gosavi Rajshri Shailesh" },
  { "id": 42, "name": "Gund Rekha Kiran" },
  { "id": 89, "name": "Gund Rutuja Sadashiv" },
  { "id": 56, "name": "Gunjal Swati Dattatray" },
  { "id": 100, "name": "Gunjan Nikam" },
  { "id": 46, "name": "Halwai Karishma Sanjeev" },
  { "id": 26, "name": "Hande Swati Dhananjay" },
  { "id": 82, "name": "Hon Akanksha Raosaheb" },
  { "id": 8, "name": "Iyengar Preeti Shrinath" },
  { "id": 52, "name": "Jage Shraddha Bhaskar" },
  { "id": 76, "name": "Jagtap Abhishek Vilas" },
  { "id": 105, "name": "Jagtap Chhaya Kamlakar" },
  { "id": 12, "name": "Jape Yogeshwar Abasaheb" },
  { "id": 36, "name": "Kakad Pranita Ganesh" },
  { "id": 58, "name": "Kalokhe Ganesh Popat" },
  { "id": 68, "name": "Kapure Deepa Babulal" },
  { "id": 116, "name": "Khaire Najuka Rajendra" },
  { "id": 25, "name": "Kulkarni Ketan Chandrakant" },
  { "id": 73, "name": "Lavhate Varsha Atul" },
  { "id": 71, "name": "Lilhare Yamesh Subhash" },
  { "id": 54, "name": "Makkad Ravina Narendra" },
  { "id": 112, "name": "Malamkar Suvarna Harish" },
  { "id": 94, "name": "Malkar Ankita Vishal" },
  { "id": 109, "name": "Manisha Pramod Deshmukh" },
  { "id": 72, "name": "Marykutty H. H." },
  { "id": 9, "name": "Matin Mohammadsaheb Daruwala" },
  { "id": 50, "name": "Mehetre Ashwini Tukaram" },
  { "id": 61, "name": "More Mala Sopan" },
  { "id": 91, "name": "Moti Kumar" },
  { "id": 34, "name": "Muthe Pushpa Suresh" },
  { "id": 99, "name": "Nagare Dipali" },
  { "id": 63, "name": "Nerkar Savita Pramod" },
  { "id": 44, "name": "Nikumbh Smita Nilseh" },
  { "id": 117, "name": "Nirmalya Dey" },
  { "id": 64, "name": "Pandore Mangala Mahendra" },
  { "id": 23, "name": "Pandore Surekha Girish" },
  { "id": 59, "name": "Parjane Usha Machindra" },
  { "id": 49, "name": "Pathan Masuda Shafikhan" },
  { "id": 55, "name": "Pathan Parvin Rajjak" },
  { "id": 98, "name": "Payel Acharya" },
  { "id": 101, "name": "Pokale Priyanka Ravindra" },
  { "id": 115, "name": "Prakash Singh Mahariya" },
  { "id": 21, "name": "Rahate Atul Narayan" },
  { "id": 10, "name": "Rajurkar Rupali Nilesh" },
  { "id": 102, "name": "Ramatvar Pal" },
  { "id": 4, "name": "Rashmi Shivnarayan Sharma" },
  { "id": 106, "name": "Reygade Savita Pundlik" },
  { "id": 17, "name": "Rohmare Jayshree Anmol" },
  { "id": 86, "name": "Romi Hitesh Shahare" },
  { "id": 93, "name": "Rutuja Dilip Bankar" },
  { "id": 20, "name": "Sadavarte Ajit Sukhdeo" },
  { "id": 104, "name": "Sakshi Shashikant Shinde" },
  { "id": 66, "name": "Sanvatsarkar Kamini Hanumant" },
  { "id": 6, "name": "Satdive Shweta Bhimraj" },
  { "id": 41, "name": "Shaikh Amarpreet Ziya" },
  { "id": 28, "name": "Shaikh Latif Kasambhai" },
  { "id": 45, "name": "Shinde Avinash Ramnath" },
  { "id": 7, "name": "Shweta Mayuresh Shinde" },
  { "id": 111, "name": "Sneha Amit Bhandari" },
  { "id": 113, "name": "Suraj Kumar" },
  { "id": 29, "name": "Surase Krushna Dilip" },
  { "id": 33, "name": "Suryawanshi Arti Babasaheb" },
  { "id": 108, "name": "Suryawanshi Neha Nitesh" },
  { "id": 22, "name": "Suryawanshi Rahul Dilip" },
  { "id": 110, "name": "Suyash Shukla" },
  { "id": 3, "name": "Swati Dhiraj Bhaskar" },
  { "id": 31, "name": "Tarde Hrushikesh Rajendra" },
  { "id": 85, "name": "Tejal Tushar Vidhwans" },
  { "id": 83, "name": "Thokal Dhanshree B" },
  { "id": 74, "name": "Thombare Avinash Kailas" },
  { "id": 92, "name": "Tiwari Prashant" },
  { "id": 96, "name": "Vaidya Shubhangi Suryakant" },
  { "id": 78, "name": "Vajpe Pooja Vishal" },
  { "id": 16, "name": "Vilas Changdev Bhagde" },
  { "id": 24, "name": "Wable Shweta Rahul" },
  { "id": 37, "name": "Wagh Renuka Anil" },
  { "id": 70, "name": "Walzade Swapnali Vilas" },
  { "id": 69, "name": "Wankhede Sandhya Vivek" },
  { "id": 107, "name": "Yeole Priya Purushottam" }
];

async function seedStaff() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    let successCount = 0;

    for (let i = 0; i < staffData.length; i++) {
      const data = staffData[i];
      
      const exists = await Staff.findOne({ staff_id: data.id });
      if (exists) {
        console.log(`Skipping: ${data.name} already exists`);
        continue;
      }

      const newStaff = new Staff({
        staff_id: data.id,
        name: data.name
      });

      await newStaff.save();
      successCount++;
    }

    console.log(`\n✅ Successfully added ${successCount} staff members!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding staff:', error);
    process.exit(1);
  }
}

seedStaff();
