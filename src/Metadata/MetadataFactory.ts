import {Annotations} from "@sirian/annotations";
import {Var} from "@sirian/common";
import {Ctor} from "@sirian/ts-extra-types";
import {AbstractDocumentAnnotation, DocumentAnnotation} from "../Annotation";
import {Metadata} from "./Metadata";

export class MetadataFactory {
    protected static map: WeakMap<Ctor, Metadata> = new WeakMap();

    public static has(c: Ctor) {
        return this.map.has(c);
    }

    public static get<C extends Ctor>(c: C) {
        const map = this.map;

        if (!map.has(c)) {
            const meta = this.loadMetadata(c);
            map.set(c, meta);
        }

        return map.get(c)! as Metadata<C>;
    }

    public static loadMetadata<C extends Ctor>(target: C) {
        const meta = new Metadata(target);

        this.loadDocMetadata(meta);
        this.loadFieldMetadata(meta);

        return meta;
    }

    protected static loadDocMetadata(meta: Metadata) {
        const target = meta.class;

        const docAnnotations = Annotations.get(AbstractDocumentAnnotation, target);

        if (docAnnotations.length > 1) {
            throw new Error();
        }

        const annotation = docAnnotations[0];

        if (Var.isInstanceOf(annotation, DocumentAnnotation)) {
            const o = annotation.options;

            meta.isDocument = true;
            meta.dbName = o.db;
            meta.collectionName = o.collection || target.name;
        }
    }

    protected static loadFieldMetadata(meta: Metadata) {

    }

    // protected static mapField($mapping)
    // {
    //     if (! isset($mapping['fieldName']) && isset($mapping['name'])) {
    //         $mapping['fieldName'] = $mapping['name'];
    //     }
    //     if (! isset($mapping['fieldName']) || ! is_string($mapping['fieldName'])) {
    //         throw MappingException::missingFieldName($this->name);
    //     }
    //     if (! isset($mapping['name'])) {
    //         $mapping['name'] = $mapping['fieldName'];
    //     }
    //
    //     if ($this->identifier === $mapping['name'] && empty($mapping['id'])) {
    //         throw MappingException::mustNotChangeIdentifierFieldsType($this->name, (string) $mapping['name']);
    //     }
    //     if ($this->discriminatorField !== null && $this->discriminatorField === $mapping['name']) {
    //         throw MappingException::discriminatorFieldConflict($this->name, $this->discriminatorField);
    //     }
    //     if (isset($mapping['collectionClass'])) {
    //         $mapping['collectionClass'] = ltrim($mapping['collectionClass'], '\\');
    //     }
    //     if (! empty($mapping['collectionClass'])) {
    //         $rColl = new ReflectionClass($mapping['collectionClass']);
    //         if (! $rColl->implementsInterface('Doctrine\\Common\\Collections\\Collection')) {
    //             throw MappingException::collectionClassDoesNotImplementCommonInterface($this->name, $mapping['fieldName'], $mapping['collectionClass']);
    //         }
    //     }
    //
    //     if (isset($mapping['cascade']) && isset($mapping['embedded'])) {
    //         throw MappingException::cascadeOnEmbeddedNotAllowed($this->name, $mapping['fieldName']);
    //     }
    //
    //     $cascades = isset($mapping['cascade']) ? array_map('strtolower', (array) $mapping['cascade']) : [];
    //
    //     if (in_array('all', $cascades) || isset($mapping['embedded'])) {
    //         $cascades = ['remove', 'persist', 'refresh', 'merge', 'detach'];
    //     }
    //
    //     if (isset($mapping['embedded'])) {
    //         unset($mapping['cascade']);
    //     } elseif (isset($mapping['cascade'])) {
    //         $mapping['cascade'] = $cascades;
    //     }
    //
    //     $mapping['isCascadeRemove']  = in_array('remove', $cascades);
    //     $mapping['isCascadePersist'] = in_array('persist', $cascades);
    //     $mapping['isCascadeRefresh'] = in_array('refresh', $cascades);
    //     $mapping['isCascadeMerge']   = in_array('merge', $cascades);
    //     $mapping['isCascadeDetach']  = in_array('detach', $cascades);
    //
    //     if (isset($mapping['id']) && $mapping['id'] === true) {
    //         $mapping['name']  = '_id';
    //         $this->identifier = $mapping['fieldName'];
    //         if (isset($mapping['strategy'])) {
    //             $this->generatorType = constant(self::class . '::GENERATOR_TYPE_' . strtoupper($mapping['strategy']));
    //         }
    //         $this->generatorOptions = $mapping['options'] ?? [];
    //         switch ($this->generatorType) {
    //             case self::GENERATOR_TYPE_AUTO:
    //                 $mapping['type'] = 'id';
    //                 break;
    //             default:
    //                 if (! empty($this->generatorOptions['type'])) {
    //                     $mapping['type'] = $this->generatorOptions['type'];
    //                 } elseif (empty($mapping['type'])) {
    //                     $mapping['type'] = $this->generatorType === self::GENERATOR_TYPE_INCREMENT ? 'int_id' : 'custom_id';
    //                 }
    //         }
    //         unset($this->generatorOptions['type']);
    //     }
    //
    //     if (! isset($mapping['nullable'])) {
    //         $mapping['nullable'] = false;
    //     }
    //
    //     if (isset($mapping['reference'])
    //         && isset($mapping['storeAs'])
    //         && $mapping['storeAs'] === self::REFERENCE_STORE_AS_ID
    //         && ! isset($mapping['targetDocument'])
    //     ) {
    //         throw MappingException::simpleReferenceRequiresTargetDocument($this->name, $mapping['fieldName']);
    //     }
    //
    //     if (isset($mapping['reference']) && empty($mapping['targetDocument']) && empty($mapping['discriminatorMap']) &&
    //             (isset($mapping['mappedBy']) || isset($mapping['inversedBy']))) {
    //         throw MappingException::owningAndInverseReferencesRequireTargetDocument($this->name, $mapping['fieldName']);
    //     }
    //
    //     if ($this->isEmbeddedDocument && $mapping['type'] === 'many' && isset($mapping['strategy']) && CollectionHelper::isAtomic($mapping['strategy'])) {
    //         throw MappingException::atomicCollectionStrategyNotAllowed($mapping['strategy'], $this->name, $mapping['fieldName']);
    //     }
    //
    //     if (isset($mapping['repositoryMethod']) && ! (empty($mapping['skip']) && empty($mapping['limit']) && empty($mapping['sort']))) {
    //         throw MappingException::repositoryMethodCanNotBeCombinedWithSkipLimitAndSort($this->name, $mapping['fieldName']);
    //     }
    //
    //     if (isset($mapping['reference']) && $mapping['type'] === 'one') {
    //         $mapping['association'] = self::REFERENCE_ONE;
    //     }
    //     if (isset($mapping['reference']) && $mapping['type'] === 'many') {
    //         $mapping['association'] = self::REFERENCE_MANY;
    //     }
    //     if (isset($mapping['embedded']) && $mapping['type'] === 'one') {
    //         $mapping['association'] = self::EMBED_ONE;
    //     }
    //     if (isset($mapping['embedded']) && $mapping['type'] === 'many') {
    //         $mapping['association'] = self::EMBED_MANY;
    //     }
    //
    //     if (isset($mapping['association']) && ! isset($mapping['targetDocument']) && ! isset($mapping['discriminatorField'])) {
    //         $mapping['discriminatorField'] = self::DEFAULT_DISCRIMINATOR_FIELD;
    //     }
    //
    //     if (isset($mapping['version'])) {
    //         $mapping['notSaved'] = true;
    //         $this->setVersionMapping($mapping);
    //     }
    //     if (isset($mapping['lock'])) {
    //         $mapping['notSaved'] = true;
    //         $this->setLockMapping($mapping);
    //     }
    //     $mapping['isOwningSide']  = true;
    //     $mapping['isInverseSide'] = false;
    //     if (isset($mapping['reference'])) {
    //         if (isset($mapping['inversedBy']) && $mapping['inversedBy']) {
    //             $mapping['isOwningSide']  = true;
    //             $mapping['isInverseSide'] = false;
    //         }
    //         if (isset($mapping['mappedBy']) && $mapping['mappedBy']) {
    //             $mapping['isInverseSide'] = true;
    //             $mapping['isOwningSide']  = false;
    //         }
    //         if (isset($mapping['repositoryMethod'])) {
    //             $mapping['isInverseSide'] = true;
    //             $mapping['isOwningSide']  = false;
    //         }
    //         if (! isset($mapping['orphanRemoval'])) {
    //             $mapping['orphanRemoval'] = false;
    //         }
    //     }
    //
    //     if (! empty($mapping['prime']) && ($mapping['association'] !== self::REFERENCE_MANY || ! $mapping['isInverseSide'])) {
    //         throw MappingException::referencePrimersOnlySupportedForInverseReferenceMany($this->name, $mapping['fieldName']);
    //     }
    //
    //     if ($this->isFile && ! $this->isAllowedGridFSField($mapping['name'])) {
    //         throw MappingException::fieldNotAllowedForGridFS($this->name, $mapping['fieldName']);
    //     }
    //
    //     $this->applyStorageStrategy($mapping);
    //     $this->checkDuplicateMapping($mapping);
    //
    //     $this->fieldMappings[$mapping['fieldName']] = $mapping;
    //     if (isset($mapping['association'])) {
    //         $this->associationMappings[$mapping['fieldName']] = $mapping;
    //     }
    //
    //     $reflProp = $this->reflClass->getProperty($mapping['fieldName']);
    //     $reflProp->setAccessible(true);
    //     $this->reflFields[$mapping['fieldName']] = $reflProp;
    //
    //     return $mapping;
    // }

}
