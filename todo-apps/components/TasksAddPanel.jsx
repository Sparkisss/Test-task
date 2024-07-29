import { StyleSheet, Text, View } from 'react-native';

export default function TasksAddPanel({data}) {
  const tasksNumber = data?.length; //получаем общее кол-во задач
  // получаем кол-во выполненых задач
  const completedTasks = data?.reduce((prev, current) => {
      if (current.completed) {
          return prev + 1;
      }
      return prev;
  }, 0); 
    
  return (
      <View >
        <Text>TODO APPLICATION</Text>
        <Text>Total number of tasks: {tasksNumber}</Text>
        <Text>Total number of tasks: {completedTasks}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});