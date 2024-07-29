import { StyleSheet, Text, View } from 'react-native';

export default function TasksListItem({id, description, completed, changeData, onDelete, editTask}) {

    //редактируем задачу через промпт (если будет время сделать модалку!!!)
    const handleEditTask = (id) => {
        const newTitle = prompt('Enter new title:', description);
        if (newTitle && editTask) {
          editTask(id, newTitle);
        }
      };

    if (id === undefined) {
        // Обработка случая, когда id не определено
        console.log('id is undefined');
        return null; // или другая логика
      }
    
  return (
      <View >
        <Text>{description}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
});