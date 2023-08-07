import { useEffect } from 'react';
import { useDrag } from "react-dnd";


export const itemTypes = {
	STUDENT: "student",
};

export default function UseItemDrag(item,handleDrag) {
	const [_, drag] = useDrag(() => ({
		type: item.type,
		end() {
			console.log("end", _);
		},
		collect(monitor) {
			return {
				isDragging: !!monitor.isDragging(),
                
			};
		},
	}));


    useEffect(()=> {
        





    },[_.isDragging])

	return { drag, ..._ };
}
