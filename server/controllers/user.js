import User from "../models/User.js";


export const getUser = async (req, res) => {
    try {
        const userId  = req.params.id;
        const user = await User.findById(userId);
        if(!user) return res.status(404).json({message: "Can't get the User"});
        const userWithoutPassword = {...user._doc};
        delete userWithoutPassword.password;
        res.status(200).json(userWithoutPassword);
    } catch (error) {
        return res.send(404).json({message: error.message});
    }
}

export const getUserFriends = async(req, res) => {
    try {
        const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user) return res.status(404).json({message: "Can't get the User"});

    const userFriends = await Promise.all(
        user.friends.map((id) => User.findById(id))
    );

    const formattedFriends = friends.map(
        ({_id, firstName, lastName, occupation, location, picturePath}) => {
            return {_id, firstName, lastName, occupation, location, picturePath};
        }
    )

    res.status(200).json(formattedFriends);

    } catch (error) {
        return res.send(404).json({message: error.message});
    }

}

export const addRemoveFriends = async (req, res) => {
    try {
        const {id, friendId} = req.params;
        const user = await User.findById(id);
        const userFriend = await User.findById(friendId);

        if(!user || !userFriend){
            return res.status(404).json({message: "User not found"});
        }

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== id);
            userFriend.friends = userFriend.friends((id) => id !== id);
        }else{
            user.friends.push(friendId);
            userFriend.friends.push(id);
        }

        await user.save();
        await userFriend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );

        const formattedFriends = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) => {
                return {_id, firstName, lastName, occupation, location, picturePath};
            }
        )

        res.status(200).json(formattedFriends);
    } catch (error) {
        return res.send(404).json({message: error.message});
    }
}