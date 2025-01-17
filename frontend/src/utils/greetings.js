export default function greetings() {
  let newDateTime = new Date().getHours();
  if (3 <= newDateTime && newDateTime < 12) return "Good Morning, ";
  if (12 <= newDateTime && newDateTime < 16) return "Good Afternoon, ";
  return "Good Evening, ";
}
