import { StyleSheet, View } from 'react-native';
import TasksListItem from './TaskListItem';


export default function TaskList({data, changeData, onDelete, editTask}) {

    const tasks = data?.map(item => {
        return (
            <TasksListItem key={item.id}
                id={item.id}
                description={item.title} 
                completed={item.completed} 
                changeData={changeData}
                onDelete={onDelete}
                editTask={editTask}
                />
        );
    });
    
  return (
      <View>
        {tasks}
      </View>
  );
}

const styles = StyleSheet.create({
  list: {
    
  },
});