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
            <Text style={[{ textDecorationLine: completed ? 'line-through' : 'none' },styles.text]}>{description}</Text>
        </Pressable>
        <View style={styles.listBtn}>
          <Pressable style={styles.btn} type="primary" shape="circle" onPress={() => handleEditTask(id)}>
            <Text>Edit</Text>
          </Pressable>
          <Pressable style={styles.btn} type="primary" shape="circle" onPress={(e) => {
              e.stopPropagation();
              if (onDelete) {
                onDelete(id);
              }
            }}>
              <Text>Delet</Text>
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
    gap: '1.8em',
    justifyContent: 'center',    
  },
  btn: {
   backgroundColor: 'white',
   padding: '0.3em', 
   borderRadius: '0.3em',
   marginTop: '1em', 
   width: '3em',
   alignItems: 'center',  
  },
  text: {
    fontSize: '1.2em',    
   },
});