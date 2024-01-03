const getIcons = async () => {
	const query = await dv.io.csv(".obsidian/plugins/obsidian-icon-folder/data.json");
	
	let list = {};
	query.map(i => {
		let splited = i[""]
			.replaceAll(`"`, "")
			.replaceAll(" ", "")
			.split(":")
		list[splited[0]] = splited[1]
	})

	return list;
}

const currentFile = dv.current()
const folderPathFromCurrentFile = currentFile.file.folder
const folderAndNotesFromCurrentFile = this.app.vault.getAbstractFileByPath(folderPathFromCurrentFile)
const getAllFoldersAndNotes = folderAndNotesFromCurrentFile.children
	.filter(c => c.name !== `${currentFile.file.name}.md`)
	.map(c => c.extension ? {...c, type: 'file'} : {...c, type: 'folder'})

const formattedToView = async (folderNotes) => {
	const icons = await getIcons();
	const orderned = folderNotes
		.sort()	
		.sort((a, b) => {
			const isFolder = (x) => x.type === 'folder'
			const isFile = (x) => x.type === 'file' 

			if (isFolder(a) && isFile(b)) {
				return -1
			} else if(isFile(a) && isFolder(b)) {
				return 1
			}
		})

	return orderned.map(c => {
		const {path, name, basename, type} = c
		const noteName = basename || name
		const notePath = type === 'file' ? path : `${path}/${name}.md`

		let properties;
		try{
			properties = new class {
				allProperties = dv.page(notePath).file.frontmatter
				defaultBlocked = ["From", "Keys"]
				visual

				constructor(){
					this.allProperties = this.filter(this.allProperties, this.defaultBlocked)
					this.visual = this.createVisual(this.allProperties)
				}

				filter(properties, blocked){
					// remove blocked properties and null
					Object.keys(properties)
						.filter(key => {
							if (blocked.includes(key) || properties[key] === null){
								delete properties[key]
							}
						})
					return properties
				}
				
				createVisual(properties){
					const keys = () => Object.keys(properties)

					let status =
						keys().includes("Status") ? [properties["Status"], "Status"] :
						properties.includes("Message") && [properties["Message"], "Message"]
						
					if (status) {
						properties = this.filter(properties, status[1])
						status = status[0]
					}

					const container = `<div style="padding-bottom: 1em; opacity: 0.8;">${
						keys()
							.map((key) => {
								let value = properties[key]

								if (typeof value === 'object') {
									value = value.join(", ")
								}

								if (typeof value === 'string' && value.includes("[[")) {
									value = value
										.replaceAll("[", "")
										.replaceAll("]", "")
									value = `<a href="${value}" class="internal-link">${value}</a>`
								}

								return `<div><span style="color: var(--text-muted);">${key}:</span> <span>${value}</span></div>`
							})
							.sort()
							.join("")
					}</div>`

					return {container, status}
				}
			}
		}
		catch(err){
			console.error(err);
		}
		
		let icon = icons[path.replaceAll(" ", "")]
		if (!icon){
			switch (type) {
				case "file":
					icon = '📃'
				break;
				case "folder":
					icon ='📁'
				break;
			}
		}

		let visual = '';
		visual += `<div>`
		visual += `<div>`
		visual += icon ? `<a href="${notePath}" class="internal-link" style="font-size: 1.3em;text-decoration: none;">${icon} </a>` : ''
		visual += `<a href="${notePath}" class="internal-link">${noteName}</a>`
		visual += properties?.visual.status ? ': ' + properties.visual.status : ''
		visual += `</div>`
		visual += properties?.visual.container ? `<span style="font-size: 0.8em;">${properties.visual.container}</span>` : ''
		visual += `</div>`
		
		return visual
	})
}

const load = async (folderNotes) => {
	const list = await formattedToView(folderNotes);

	dv.header(2, list.length > 1 ? "Links" : "Link");
	dv.list(list, false);
}

load(getAllFoldersAndNotes)
