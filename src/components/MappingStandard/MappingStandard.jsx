import styles from "./MappingStandard.module.scss"
import { Header ,Button} from ".."

export const MappingStandard = () => {
    return (
        <div>
            <div className={styles.tabHead}>
                <Header level={2}>Mapping Standard</Header>
               
                    <Button>Edit</Button>
                
            </div>
        </div>
    )
}
