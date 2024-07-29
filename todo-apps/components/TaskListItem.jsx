import { StyleSheet, Pressable, View, Text} from 'react-native';

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
        return null; 
      }
    
      return (
        <View style={styles.listItem} >   
        <Pressable onPress={() => { if (changeData) changeData(id) }}>    
            <Text style={{ textDecorationLine: completed ? 'line-through' : 'none' }}>{description}</Text>
        </Pressable>
        <View style={styles.listBtn}>
          <Pressable type="primary" shape="circle" onPress={() => handleEditTask(id)}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable type="primary" shape="circle" onPress={(e) => {
              e.stopPropagation();
              if (onDelete) {
                onDelete(id);
              }
            }}>
              <Text>Edit</Text>
          </Pressable> 
        </View>        
         
        </View>
      );
    };

const styles = StyleSheet.create({
  listItem: {
    alignItems: 'center',
    padding: '1em',    
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: 'grey',
    borderWidth: 1,
    marginTop: '1em',
    marginLeft: '1em',
    marginRight: '1em',
  },
  listBtn: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5em',
    justifyContent: 'center',    
  },
});