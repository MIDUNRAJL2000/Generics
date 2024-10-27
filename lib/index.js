"use strict";
// interface Repository<T>{
//     items: T[];
//     add(item: T): void;
//     remove(id: number): void;
//     find(predicate: (item: T) => boolean): T | undefined;
// }
class DataRepository {
    constructor(initialItems = []) {
        // Ensure no duplicate IDs in initial items
        const uniqueIds = new Set(initialItems.map(item => item.id));
        if (uniqueIds.size !== initialItems.length) {
            throw new Error("Initial items contain duplicate IDs");
        }
        this.items = [...initialItems];
    }
    add(item) {
        // Check for duplicate ID
        if (this.items.some(existing => existing.id === item.id)) {
            throw new Error(`Item with ID ${item.id} already exists`);
        }
        this.items.push(item);
    }
    remove(id) {
        const initialLength = this.items.length;
        this.items = this.items.filter(item => item.id !== id);
        return this.items.length !== initialLength;
    }
    find(predicate) {
        return this.items.find(predicate);
    }
    getAll() {
        return [...this.items]; // Return a copy to prevent direct modification
    }
    update(id, updatedItem) {
        if (updatedItem.id !== id) {
            throw new Error("Updated item ID must match the specified ID");
        }
        const index = this.items.findIndex(item => item.id === id);
        if (index === -1) {
            return false;
        }
        this.items[index] = updatedItem;
        return true;
    }
    count() {
        return this.items.length;
    }
    // Additional utility methods
    findById(id) {
        return this.items.find(item => item.id === id);
    }
    clear() {
        this.items = [];
    }
}
try {
    const userRepo = new DataRepository();
    // Adding users
    userRepo.add({ id: 1, name: "John" });
    userRepo.add({ id: 2, name: "Midun" });
    // Finding users
    console.log("Find by name:", userRepo.find(user => user.name === "John"));
    console.log("Find by ID:", userRepo.findById(1));
    // Updating a user
    const updateSuccess = userRepo.update(1, { id: 1, name: "John Doe", email: "john@example.com" });
    console.log("Update success:", updateSuccess);
    // Removing a user
    const removeSuccess = userRepo.remove(1);
    console.log("Remove success:", removeSuccess);
    // Get all users
    console.log("All users:", userRepo.getAll());
    console.log("Total users:", userRepo.count());
    // Try to add duplicate ID (will throw error)
    userRepo.add({ id: 2, name: "Another Midun" });
}
catch (error) {
    if (error instanceof Error) {
        console.error("Error:", error.message);
    }
}
