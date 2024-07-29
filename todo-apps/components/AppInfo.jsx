import { StyleSheet, Text, View } from 'react-native';

export default function AppInfo({data}) {
  const tasksNumber = data?.length; //получаем общее кол-во задач
  // получаем кол-во выполненых задач
  const completedTasks = data?.reduce((prev, current) => {
      if (current.completed) {
          return prev + 1;
      }
      return prev;
  }, 0); 
    
  return (
      <View style={styles.info}>
        <Text style={[styles.text, styles.color]}>TODO APPLICATION</Text>
        <Text style={styles.text}>Total number of tasks: {tasksNumber}</Text>
        <Text style={styles.text}>Total number of tasks: {completedTasks}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    display: 'flex',
    alignItems: 'center', 
    justifyContent: 'center',     
  },
  text: {
    fontWeight: 'bold',
    fontSize: '1.2em',     
  },
  color: {
    color: 'green',     
  },
});
